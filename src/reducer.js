const intialState = {
  history: [],
  settings: {
    apiKey: '',
    appId: '',
    authServer: 'https://auth.airbitz.co/api',
    fakeServer: false
  }
}

let nextCommandKey = 0
export function pickCommandKey () {
  return ++nextCommandKey
}

export function addCommand (command) {
  return { type: addCommand, command }
}

export function clearHistory () {
  return { type: clearHistory }
}

export function updateSettings (settings) {
  return { type: updateSettings, settings }
}

export function reducer (state = intialState, action) {
  const { history } = state

  switch (action.type) {
    case addCommand:
      return { ...state, history: [action.command, ...history] }

    case clearHistory:
      return { ...state, history: [] }

    case updateSettings:
      return { ...state, settings: action.settings }
  }

  return state
}
