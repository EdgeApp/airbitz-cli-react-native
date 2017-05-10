import React, { Component } from 'react'
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

// CSS common colors:
export const darker = '#304050'
export const dark = '#405060'
export const darkRed = '#604050'
export const darkGreen = '#506040'
export const light = '#ecf0f4'
export const lightGreen = '#f0ffe0'
export const lightRed = '#ffe0f0'

const styles = StyleSheet.create({
  page: {
    backgroundColor: darker,
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 22 : 0
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  menu: {
    height: 18,
    width: 24,
    marginRight: 10
  },
  textInput: {
    alignSelf: 'center', // Bug in component?
    backgroundColor: dark,
    borderColor: light,
    borderRadius: 10,
    borderWidth: 1,
    color: light,
    flex: 1,
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  flatList: {
    flex: 1
  }
})

function itemStyles (darkStatus, lightStatus) {
  return StyleSheet.create({
    item: {
      alignItems: 'stretch',
      flexDirection: 'column'
    },
    row: {
      backgroundColor: darkStatus,
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5
    },
    icon: {
      color: lightStatus,
      width: 20
    },
    command: {
      color: lightStatus,
      flex: 1
    },
    output: {
      color: light,
      paddingLeft: 30,
      paddingRight: 10,
      paddingVertical: 5
    }
  })
}

const doneStyles = itemStyles(darkGreen, lightGreen)
const failedStyles = itemStyles(darkRed, lightRed)
const pendingStyles = itemStyles(dark, light)

const nop = () => {}

/**
 * This is the settings control panel.
 */
export class Console extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: null
    }
  }

  render () {
    const { history, onSettings = nop, onEnter = nop } = this.props
    const { text } = this.state

    const onChange = prop => value => this.setState({ [prop]: value })

    return (
      <View style={styles.page}>
        <StatusBar barStyle='light-content' />
        <View style={styles.topRow}>
          <TouchableOpacity onPress={onSettings}>
            <Image source={require('./menu.png')} style={styles.menu} />
          </TouchableOpacity>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus
            blurOnSubmit={false}
            onChangeText={onChange('text')}
            onSubmitEditing={() => {
              this.setState({ text: '' })
              onEnter(text)
            }}
            style={styles.textInput}
            underlineColorAndroid='transparent'
            value={text}
          />
        </View>
        <FlatList
          style={styles.flatList}
          data={history}
          contentContainerStyle={styles.scrollContainer}
          renderItem={item => this.renderItem(item)}
          keyboardShouldPersistTaps={'always'}
          enableEmptySections
        />
      </View>
    )
  }

  renderItem ({ item }) {
    const { onRemove = nop } = this.props

    let styles = pendingStyles
    if (item.success === true) styles = doneStyles
    if (item.success === false) styles = failedStyles

    let icon = '⋯'
    if (item.success === true) icon = '✓'
    if (item.success === false) icon = '✗'

    return (
      <View style={styles.item} key={item.key}>
        <TouchableOpacity
          onPress={() => this.setState({ text: item.command })}
          onLongPress={() => onRemove(item.key)}
        >
          <View style={styles.row}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.command}>{item.command}</Text>
          </View>
        </TouchableOpacity>
        {item.output !== '' && <Text style={styles.output}>{item.output}</Text>}
      </View>
    )
  }
}
