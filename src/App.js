import React, { Component } from 'react'
import { Modal, View } from 'react-native'
import { Console } from './components/Console.js'
import { Settings } from './components/Settings.js'

/**
 * This is the settings control panel.
 */
export class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      history: [
        {
          key: 2,
          command: 'recovery-setup blah no blah yes',
          output: 'Something\nsomething',
          success: undefined
        },
        {
          key: 1,
          command: 'pin-setup blah 1234',
          output: 'Something\nsomething',
          success: false
        },
        {
          key: 0,
          command: 'pin-login blah 1234',
          output: 'Something\nsomething',
          success: true
        }
      ],
      settings: {
        apiKey: '',
        appId: '',
        authServer: 'https://auth.airbitz.co/api',
        fakeServer: false
      },
      settingsVisible: false
    }
  }

  render () {
    const { history, settings, settingsVisible } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Modal
          visible={settingsVisible}
          onRequestClose={() => this.hideSettings()}
        >
          <Settings
            onApply={settings => this.applySettings(settings)}
            onCancel={() => this.hideSettings()}
            onClear={() => this.clearHistory()}
            settings={settings}
          />
        </Modal>

        <Console
          history={history}
          onEnter={text => this.addCommand(text)}
          onSettings={() => this.showSettings()}
        />
      </View>
    )
  }

  addCommand (text) {
    this.setState(state => {
      const { history } = state
      const command = {
        key: history.length,
        command: text,
        output: ''
      }
      if (/out/.test(text)) command.output = 'Output\ntext'
      if (/ok/.test(text)) command.success = true
      if (/bad/.test(text)) command.success = false

      return { ...state, history: [command, ...history] }
    })
  }

  clearHistory () {
    this.setState({ history: [], settingsVisible: false })
  }

  applySettings (settings) {
    this.setState({
      settings: settings,
      settingsVisible: false
    })
  }

  hideSettings () {
    this.setState({ settingsVisible: false })
  }

  showSettings () {
    this.setState({ settingsVisible: true })
  }
}
