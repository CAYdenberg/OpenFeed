import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {timelinePosts} from '../../store/selectors'
import {actions} from '../../store/posts'
import Post from './Post'

const mapStateToProps = state => {
  return {
    posts: timelinePosts(state),
    loadState: state.posts.loadState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openPost: (_id) => {
      dispatch(actions.openPost(_id))
      dispatch(actions.markRead(_id))
    },
    markRead: (_id) => {
      dispatch(actions.markRead(_id))
    }
  }
}

const Timeline = ({loadState, posts, openPost, markRead}) => {
  if (loadState < 2) {
    return <div className="loading" />
  }

  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>
  }

  return (
    (posts.map(post =>
      <Post {...post} openPost={openPost} markRead={markRead} key={post._id} />
    ))
  )
}

Timeline.propTypes = {
  posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
