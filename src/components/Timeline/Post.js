import React from 'react'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'

const Post = (props) => {
  const {feed, title, summary} = props
  const date = props.date_published ? DateTime.fromISO(props.date_published) : null

  return (
    <div className="card card--post">
      <a href="#" className="card-header" onClick={() => props.openPost(props._id)}>
        <h3 className="card-header-title">{title}</h3>
      </a>

      <div className="card-content">
        <p>{summary}</p>
        <p className="is-size-7 has-text-grey metadata">
          <time dateTime={props.date_published} className="metadata__item">
            {date.toLocaleString()}
          </time>
          <span className="metadata__item">
            {feed && feed.author}
          </span>
          <span className="metadata__item">
            {feed && feed.title}
          </span>
        </p>
      </div>
    </div>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date_published: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  feed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string
  })
}

export default Post
