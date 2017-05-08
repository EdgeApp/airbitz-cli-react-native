import React, { Component } from 'react'
import { View } from 'react-native'
import { Console } from './components/Console.js'

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
      ]
    }
  }

  render () {
    const { history } = this.state

    return (
      <View style={{ flex: 1 }}>
        <Console history={history} onEnter={text => this.addCommand(text)} />
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

      return { history: [command, ...history] }
    })
  }
}
