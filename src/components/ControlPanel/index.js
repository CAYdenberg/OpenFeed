import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {actions} from '../../store/feeds'
import AddFeed from './AddFeed'

const mapStateToProps = state => {
  return {
    feeds: state.feeds.feeds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: id => dispatch(actions.removeFeed(id))
  }
}

const ControlPanel = props => {
  return (
    <nav className="panel">
      <p className="panel-tabs">
        <a className="is-active">Feeds</a>
        <a>Pheeders</a>
        <a>Settings</a>
      </p>

      {props.feeds.map(feed =>
        <a className="panel-block is-active is-flex" key={feed._id}>
          <span className="is-expanded">{feed.title}</span>
          <button
            type="button"
            className="delete is-small"
            onClick={() => props.remove(feed._id)}
          >Remove</button>
        </a>
      )}

      <AddFeed />
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
