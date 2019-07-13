import React from 'react'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import DOMPurify from 'dompurify'
import {getId} from '../../helpers'
import Icon, {openOriginal} from '../Icons'

const Post = (props) => {
  const {feed, title, summary, isOpen, content_html} = props
  const date = props.date_published ? DateTime.fromISO(props.date_published) : null

  return (
    <div className="card card--post" id={props._id}>
      <a href="#" className="card-header" onClick={(e) => props.openPost(e, props._id)}>
        <h3 className="card-header-title">
          {title}
        </h3>
      </a>

      <div className="card-content">
        {isOpen ? (
          <div dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content_html)
          }} />
        ) : (
          <p className="card__summary">{summary}</p>
        )}

        <div className="is-size-7 has-text-grey metadata">
          <time dateTime={props.date_published} className="metadata__item">
            {date.toLocaleString()}
          </time>
          <span className="metadata__item">
            {feed && feed.author}
          </span>
          <span className="metadata__item">
            {feed && feed.title}
          </span>
          <span className="metadata__item">
            <a href={getId(props)} target="_blank">
              <span className="icon"><Icon icon={openOriginal} /></span>
            </a>
          </span>
        </div>
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
  }),
  isOpen: PropTypes.bool,
}

export default Post
