import { connect } from 'react-redux'
import { Console } from '../components/Console.js'
import { addCommand, pickCommandKey } from '../reducer.js'

function mapStateToProps (state) {
  const { history } = state
  return { history }
}

function mapDispatchToProps (dispatch) {
  return {
    onEnter (text) {
      const command = {
        command: text,
        key: pickCommandKey(),
        output: ''
      }
      if (/out/.test(text)) command.output = 'Output\ntext'
      if (/ok/.test(text)) command.success = true
      if (/bad/.test(text)) command.success = false

      dispatch(addCommand(command))
    }
  }
}

export const LiveConsole = connect(mapStateToProps, mapDispatchToProps)(
  Console
)
