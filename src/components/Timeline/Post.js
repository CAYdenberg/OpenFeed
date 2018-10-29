import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Post = ({post, feedTitle, feedAuthor}) => {
  const mDate = post.date_published ? moment(post.date_published) : null

  return (
    <div className="card card--post">
      <a href="#" className="card-header">
        <h3 className="card-header-title">{post.title}</h3>
      </a>

      <div className="card-content">
        <div className="columns" style={{fontWeight: 700, fontSize: '0.8rem'}}>
          <div className="column">{feedAuthor}</div>

          <div className="column">
            {mDate &&
              <time dateTime={mDate}>{mDate.format('MMM Do')}</time>
            }
          </div>

          <div className="column">{feedTitle}</div>
        </div>
        <p>{post.summary}</p>
      </div>

      <footer className="card-footer">
        <a href="#" className="card-footer-item">Open</a>
        <a href="#" className="card-footer-item">Original</a>
        <a href="#" className="card-footer-item">Mark Read</a>
      </footer>

    </div>
  )
}

export default Post
