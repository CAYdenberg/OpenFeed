import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {timelinePosts} from '../../store/selectors'
import {getId} from '../../helpers'
import Post from './Post'

const mapStateToProps = state => {
  return {
    posts: timelinePosts(state)
  }
}

const Timeline = ({posts}) => {
  if (!posts.length) {
    return <h3 className="is-size-3 has-text-centered">No posts</h3>
  }

  return (
    (posts.map(post =>
      <Post {...post} key={getId(post)} />
    ))
  )
}

Timeline.propTypes = {
  posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Timeline)
