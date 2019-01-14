import React from 'react'

import Icon, {back, read} from './Icons'

const SinglePostControls = ({closePost}) => {
  return (
    <div className="buttons">
      <button type="button" className="button" onClick={closePost}>
        <span className="icon">
          <Icon icon={back} title="Go back" />
        </span>
      </button>

      <button type="button" className="button" onClick={closePost}>
        <span className="icon">
          <Icon icon={read} title="Go back" />
        </span>
      </button>
    </div>
  )
}

export default SinglePostControls
