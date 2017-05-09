import { AsyncStorage } from 'react-native'
import {
  addCommand,
  pickCommandKey,
  defaultSettings,
  updateSettings
} from './reducer.js'

function showError (store, command, e) {
  store.dispatch(
    addCommand({
      key: pickCommandKey,
      command,
      outuput: e.message,
      success: false
    })
  )
}

function loadHistory (store) {
  return AsyncStorage.getItem('history').then(text => {
    if (text) {
      const history = JSON.parse(text)
      history.reverse().forEach(row => {
        const key = pickCommandKey()
        const { command = '', output = '', success = false } = row

        store.dispatch(addCommand({ key, command, output, success }))
      })
    }
  })
}

function loadSettings (store) {
  AsyncStorage.getItem('settings').then(text => {
    if (text) {
      store.dispatch(
        updateSettings({ ...defaultSettings, ...JSON.parse(text) })
      )
    }
  })
}

export function loadStore (store) {
  return Promise.all(loadHistory(store), loadSettings(store)).catch(e =>
    showError(store, 'load settings', e)
  )
}

function saveHistory (store) {
  const { history } = store.getState()
  return AsyncStorage.setItem('history', JSON.stringify(history)).catch(e =>
    showError(store, 'save history', e)
  )
}

function saveSettings (store) {
  const { settings } = store.getState()
  return AsyncStorage.setItem('settings', JSON.stringify(settings)).catch(e =>
    showError(store, 'save settings', e)
  )
}

export function saveMiddleware (store) {
  return next => action => {
    const before = store.getState()
    const result = next(action)
    const after = store.getState()

    if (before.history.length !== after.history.length) saveHistory(store)
    if (before.settings !== after.settings) saveSettings(store)

    return result
  }
}
