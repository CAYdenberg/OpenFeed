import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {actions} from '../../../store/feeds'
import {actions as postsActions} from '../../../store/posts'
import {viewType, activeFeed} from '../../../store/selectors'

const mapStateToProps = state => {
  return {
    feeds: state.feeds.feeds,
    activeFeed: activeFeed(state),
    isAll: viewType(state) === 'all'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: (id, e) => {
      e.stopPropagation()
      dispatch(actions.removeFeed(id))
    },

    loadAll: (e) => {
      e.preventDefault()
      dispatch(postsActions.load())
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

      <a
        className={`panel-block is-flex ${props.isAll ? 'is-active' : ''}`}
        onClick={props.loadAll}
      >
        All
      </a>

      {props.feeds.map(feed => {
        const isActive = props.activeFeed === feed._id ? 'is-active' : ''
        return (
          <a
            className={`panel-block is-flex ${isActive}`}
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
        )
      })}

    </React.Fragment>
  )
}

FeedsList.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  remove: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedsList)
