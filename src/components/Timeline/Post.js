import React from 'react'
import PropTypes from 'prop-types'
import {DateTime} from 'luxon'
import IsReadSwitch from '../IsReadSwitch'
import {getId} from '../../helpers'
import Icon, {openOriginal} from '../Icons'

const Post = (props) => {
  const {feed, title, summary, markRead} = props
  const date = props.date_published ? DateTime.fromISO(props.date_published) : null

  return (
    <div className="card card--post">
      <a href="#" className="card-header" onClick={() => props.openPost(props._id)}>
        <h3 className="card-header-title">
          {title}
        </h3>
        <IsReadSwitch isRead={props.isRead} id={props._id} />
      </a>

      <div className="card-content">
        <p className="card__summary">{summary}</p>
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
            <a href={getId(props)} target="_blank" onClick={() => markRead(props._id)}>
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
  })
}

export default Post
