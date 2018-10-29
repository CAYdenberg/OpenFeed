import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import _get from 'lodash.get'

import Post from './Post'

const mapStateToProps = state => {
  return {
    posts: state.newFeed.posts,
    feedTitle: _get(state, 'newFeed.feed.title', null),
    feedAuthor: _get(state, 'newFeed.feed.author', null)
  }
}

const Timeline = ({posts, feedTitle, feedAuthor}) => {
  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>
  }

  return (
    (posts.map(post =>
      <Post post={post} key={post.id} feedTitle={feedTitle} feedAuthor={feedAuthor} />
    ))
  )
}

Timeline.propTypes = {
  posts: PropTypes.array.isRequired,
  feedTitle: PropTypes.string,
  feedAuthor: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    avatar: PropTypes.string
  })
}

export default connect(mapStateToProps)(Timeline)
