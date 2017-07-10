import { findCommand, UsageError } from 'airbitz-cli'
import { makeContext, makeFakeIos } from 'airbitz-core-js'

import parse from 'lib-cmdparse'
import {
  addCommand,
  addCommandOutput,
  finishCommand,
  pickCommandKey,
  updateSession
} from './reducer.js'
import { makeReactNativeIo } from 'airbitz-core-react-native'

function makeFakeSession (settings) {
  const [io] = makeFakeIos(1)
  const context = makeContext({
    apiKey: settings.apiKey,
    appId: settings.appId,
    authServer: settings.authServer,
    io
  })

  return { io, context }
}

function makeReactSession (settings) {
  return makeReactNativeIo().then(io => {
    const context = makeContext({
      apiKey: settings.apiKey,
      appId: settings.appId,
      authServer: settings.authServer,
      io
    })

    return { io, context }
  })
}

function ensureSession (dispatch, session, settings) {
  if (session != null) {
    return Promise.resolve(session)
  } else if (settings.fakeServer) {
    const session = makeFakeSession(settings)
    dispatch(updateSession(session))
    return Promise.resolve(session)
  } else {
    return makeReactSession(settings).then(session => {
      dispatch(updateSession(session))
      return session
    })
  }
}

/**
 * Creates the series of Redux actions needed to run an Airbitz command.
 */
export function runCommand (text) {
  return function (dispatch, getState) {
    const { session, settings } = getState()
    let textOut = ''

    // Add the command to the list:
    const key = pickCommandKey()
    const command = { command: text, key, output: '' }
    dispatch(addCommand(command))

    // Actually run the command:
    return ensureSession(dispatch, session, settings)
      .then(session => {
        const parsed = parse(text)
        const cmd = parsed.exec ? findCommand(parsed.exec) : findCommand('help')

        if ((cmd.needsLogin || cmd.needsAccount) && session.account == null) {
          throw new UsageError(cmd, 'Please log in first')
        }

        const console = {
          log (...args) {
            if (textOut !== '') textOut += '\n'
            textOut += args.join(' ')
          }
        }
        return cmd.invoke(console, session, parsed.args)
      })
      .then(
        () => {
          dispatch(addCommandOutput(key, textOut))
          dispatch(finishCommand(key, true))
        },
        e => {
          console.log(e)
          if (textOut !== '') textOut += '\n'
          textOut += e.toString()

          dispatch(addCommandOutput(key, textOut))
          dispatch(finishCommand(key, false))
        }
      )
  }
}
