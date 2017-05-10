export const defaultSettings = {
  apiKey: '',
  appId: '',
  authServer: 'https://auth.airbitz.co/api',
  fakeServer: false
}
const intialState = { history: [], settings: defaultSettings, session: null }

let nextCommandKey = 0
export function pickCommandKey () {
  return ++nextCommandKey
}

export function addCommand (command) {
  return { type: addCommand, command }
}

export function removeCommand (key) {
  return { type: removeCommand, key }
}

export function addCommandOutput (key, text) {
  return { type: addCommandOutput, key, text }
}

export function finishCommand (key, success) {
  return { type: finishCommand, key, success }
}

export function clearHistory () {
  return { type: clearHistory }
}

export function updateSettings (settings) {
  return { type: updateSettings, settings }
}

export function updateSession (session) {
  return { type: updateSession, session }
}

export function reducer (state = intialState, action) {
  const { history } = state

  switch (action.type) {
    case addCommand:
      return { ...state, history: [action.command, ...history] }

    case removeCommand:
      return {
        ...state,
        history: history.filter(row => row.key !== action.key)
      }

    case addCommandOutput:
      return {
        ...state,
        history: history.map(row => {
          if (row.key === action.key) {
            const output = row.output !== '' ? row.output + '\n' : ''
            return { ...row, output: output + action.text }
          }
          return row
        })
      }

    case finishCommand:
      return {
        ...state,
        history: history.map(
          row =>
            (row.key === action.key ? { ...row, success: action.success } : row)
        )
      }

    case clearHistory:
      return { ...state, history: [] }

    case updateSettings:
      return { ...state, settings: action.settings, session: null }

    case updateSession:
      return { ...state, session: action.session }
  }

  return state
}
