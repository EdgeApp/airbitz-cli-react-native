import { connect } from 'react-redux'
import { Console } from '../components/Console.js'
import { runCommand } from '../runCommand.js'

function mapStateToProps (state) {
  const { history } = state
  return { history }
}

function mapDispatchToProps (dispatch) {
  return {
    onEnter (text) {
      dispatch(runCommand(text))
    }
  }
}

export const LiveConsole = connect(mapStateToProps, mapDispatchToProps)(Console)
