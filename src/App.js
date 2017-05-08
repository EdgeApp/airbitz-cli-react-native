import React, { Component } from 'react'
import { Modal, View } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { LiveConsole } from './containers/LiveConsole.js'
import { LiveSettings } from './containers/LiveSettings.js'
import { reducer } from './reducer.js'
import { loadStore, saveMiddleware } from './storage.js'

const store = createStore(reducer, applyMiddleware(thunk, saveMiddleware))
loadStore(store)

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
