import React, { Component } from 'react'
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 22 : 0
  },
  settings: {
    flexDirection: 'column',
    padding: 15
  },
  heading: {
    color: '#456',
    fontSize: 20,
    marginBottom: 15
  },
  label: {
    color: '#888',
    fontSize: 15,
    marginBottom: 5
  },
  textBox: {
    borderRadius: 10,
    borderWidth: 1,
    height: 35,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  switch: {
    marginBottom: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const nop = () => {}

/**
 * This is the settings control panel.
 */
export class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = props.settings || {}
  }

  render () {
    const { onApply = nop, onCancel = nop, onClear = nop } = this.props

    const {
      apiKey = '',
      appId = '',
      authServer = '',
      fakeServer = true
    } = this.state

    const onChange = prop => value => this.setState({ [prop]: value })

    return (
      <View style={styles.page}>
        <StatusBar barStyle='dark-content' />
        <View style={styles.settings}>
          <Text style={styles.heading}>Edit Settings</Text>

          <Text style={styles.label}>API key:</Text>
          <TextInput
            autoCapitalize='none'
            onChangeText={onChange('apiKey')}
            style={styles.textBox}
            underlineColorAndroid='transparent'
            value={apiKey}
          />

          <Text style={styles.label}>appId:</Text>
          <TextInput
            autoCapitalize='none'
            onChangeText={onChange('appId')}
            style={styles.textBox}
            underlineColorAndroid='transparent'
            value={appId}
          />

          <Text style={styles.label}>Auth server URI:</Text>
          <TextInput
            autoCapitalize='none'
            editable={!fakeServer}
            onChangeText={onChange('authServer')}
            style={styles.textBox}
            underlineColorAndroid='transparent'
            value={authServer}
          />

          <Text style={styles.label}>Use fake server:</Text>
          <Switch
            onValueChange={onChange('fakeServer')}
            style={styles.switch}
            value={fakeServer}
          />

          <View style={styles.row}>
            <Button onPress={onCancel} title='Cancel' />
            <Button onPress={() => onApply(this.state)} title='Apply' />
          </View>
        </View>

        <Button onPress={onClear} title='Clear history' />
      </View>
    )
  }
}
