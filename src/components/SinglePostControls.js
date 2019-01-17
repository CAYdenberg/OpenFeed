import React from 'react'

import IsReadSwitch from './IsReadSwitch'
import Icon, {back, openOriginal} from './Icons'
import {getId} from '../helpers'

const SinglePostControls = ({post, closePost}) => {
  return (
    <div className="single-post-controls">
      <button type="button" className="plain-button" onClick={closePost}>
        <span className="icon">
          <Icon icon={back} title="Go back" />
        </span>
      </button>

      <IsReadSwitch isRead={post.isRead} id={post._id} />

      <a href={getId(post)} target="_blank" className="plain-button">
        <span className="icon"><Icon icon={openOriginal} /></span>
      </a>
    </div>
  )
}

export default SinglePostControls
