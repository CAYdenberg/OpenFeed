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
        <div className="columns" style={{fontWeight: 700, fontSize: '0.8rem'}}>
          <div className="column">{feed && feed.author}</div>

          <div className="column">
            {date &&
              <time dateTime={props.date_published}>{date.toLocaleString()}</time>
            }
          </div>

          <div className="column">{feed && feed.title}</div>
        </div>
        <p>{summary}</p>
      </div>

      <footer className="card-footer">
        <a href="#" className="card-footer-item">Open</a>
        <a href="#" className="card-footer-item">Original</a>
        <a href="#" className="card-footer-item">Mark Read</a>
      </footer>

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
