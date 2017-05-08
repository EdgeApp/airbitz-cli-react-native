import React, { Component } from 'react'
import { Modal, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { LiveConsole } from './containers/LiveConsole.js'
import { LiveSettings } from './containers/LiveSettings.js'
import { addCommand, pickCommandKey, reducer } from './reducer.js'

const store = createStore(reducer)

const history = [
  {
    key: pickCommandKey(),
    command: 'recovery-setup blah no blah yes',
    output: 'Something\nsomething',
    success: undefined
  },
  {
    key: pickCommandKey(),
    command: 'pin-setup blah 1234',
    output: 'Something\nsomething',
    success: false
  },
  {
    key: pickCommandKey(),
    command: 'pin-login blah 1234',
    output: 'Something\nsomething',
    success: true
  }
]
history.forEach(command => store.dispatch(addCommand(command)))

/**
 * This is the settings control panel.
 */
export class App extends Component {
  constructor (props) {
    super(props)

    this.state = { settingsVisible: false }
  }

  render () {
    const { settingsVisible } = this.state

    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Modal
            visible={settingsVisible}
            onRequestClose={() => this.hideSettings()}
          >
            <LiveSettings onCancel={() => this.hideSettings()} />
          </Modal>

          <LiveConsole onSettings={() => this.showSettings()} />
        </View>
      </Provider>
    )
  }

  hideSettings () {
    this.setState({ settingsVisible: false })
  }

  showSettings () {
    this.setState({ settingsVisible: true })
  }
}
