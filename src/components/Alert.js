import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../store/errors'

const mapStateToProps = state => {
  const message = state.errors.message
  return {
    message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dismiss: () => dispatch(actions.dismiss())
  }
}

export const Alert = props => {
  if (!props.message) return null

  return (
    <div className="message-wrapper">
      <div className="message is-warning" aria-live="polite">
        <div className="message-header">
          {props.message}
          <button className="delete" aria-label="delete" onClick={props.dismiss}></button>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)
