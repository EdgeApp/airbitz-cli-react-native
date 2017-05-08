import { connect } from 'react-redux'
import { Settings } from '../components/Settings.js'
import { clearHistory, updateSettings } from '../reducer.js'

function mapStateToProps (state) {
  const { settings } = state
  return { settings }
}

function mapDispatchToProps (dispatch, props) {
  return {
    onApply (settings) {
      dispatch(updateSettings(settings))
      props.onCancel()
    },
    onClear () {
      dispatch(clearHistory())
      props.onCancel()
    }
  }
}

export const LiveSettings = connect(mapStateToProps, mapDispatchToProps)(
  Settings
)
