import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {timelinePosts, openPost} from '../../store/selectors'
import {actions} from '../../store/posts'
import Post from './Post'

const mapStateToProps = state => {
  return {
    posts: timelinePosts(state),
    openPost: openPost(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markRead: (e, _id) => {
      e.preventDefault()
      dispatch(actions.markRead(_id))
    },
    handleOpenPost: (e, _id) => {
      e.preventDefault()
      dispatch(actions.openPost(_id))
    },
    handleClosePost: (e) => {
      e.preventDefault()
      dispatch(actions.closePost())
    }
  }
}

const Timeline = ({posts, openPost, handleOpenPost}) => {
  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>
  }

  return (
    (posts.map(post =>
      <Post
        {...post}
        openPost={handleOpenPost}
        isOpen={openPost && (openPost.id === post.id)}
        key={post.id}
      />
    ))
  )
}

Timeline.propTypes = {
  posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
