import React from 'react'
import {connect} from 'react-redux'
import Icon, {read, unread} from './Icons'
import {actions} from '../store/posts'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    markRead: (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(actions.markRead(ownProps.id))
    },
    markUnread: (e) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(actions.markUnread(ownProps.id))
    }
  }
}

const IsReadSwitch = props => {
  return (
    <button
      type="button"
      className="plain-button"
      onClick={props.isRead ? props.markUnread : props.markRead}
    >
      <span className="icon">
        {props.isRead
          ? <Icon icon={read} />
          : <Icon icon={unread} />
        }
      </span>
    </button>
  )
}

export default connect(null, mapDispatchToProps)(IsReadSwitch)
