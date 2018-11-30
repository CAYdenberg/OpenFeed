import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Post = (props) => {
  const {feed, title, summary} = props
  const mDate = props.date_published ? moment(props.date_published) : null

  return (
    <div className="card card--post">
      <a href="#" className="card-header">
        <h3 className="card-header-title">{title}</h3>
      </a>

      <div className="card-content">
        <div className="columns" style={{fontWeight: 700, fontSize: '0.8rem'}}>
          <div className="column">{feed.author}</div>

          <div className="column">
            {mDate &&
              <time dateTime={mDate}>{mDate.format('MMM Do')}</time>
            }
          </div>

          <div className="column">{feed.title}</div>
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
