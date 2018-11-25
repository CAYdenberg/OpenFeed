import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {actions} from '../../store/feeds'
import {actions as postsActions} from '../../store/posts'

const mapStateToProps = state => {
  return {
    feeds: state.feeds.feeds
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: (id, e) => {
      e.stopPropagation()
      dispatch(actions.removeFeed(id))
    },

    load: (id, e) => {
      e.preventDefault()
      dispatch(postsActions.loadByFeed(id))
    }
  }
}

export const FeedsList = props => {
  return (
    <React.Fragment>

      {props.feeds.map(feed =>
        <a
          className="panel-block is-active is-flex"
          key={feed._id}
          onClick={e => props.load(feed._id, e)}
        >
          <span className="is-expanded">{feed.title}</span>
          <button
            type="button"
            className="delete is-small"
            onClick={e => props.remove(feed._id, e)}
          >Remove</button>
        </a>
      )}

    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsList)
