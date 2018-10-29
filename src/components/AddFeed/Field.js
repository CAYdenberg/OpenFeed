import React from 'react'
import PropTypes from 'prop-types'

import Icon, {valid, invalid} from '../Icons'

const AddFeedField = ({loadState, value, onChange}) => {
  const inputClassName = (loadState === 2)
    ? 'is-success'
    : (loadState === -1)
      ? 'is-danger'
      : ''

  const icon = (loadState === 1)
    ? <i className="loader"></i>
    : (loadState === 2)
      ? <Icon icon={valid} />
      : (loadState === -1)
        ? <Icon icon={invalid} />
        : null

  return (

    <div className="control has-icons-right is-expanded">

      <input
        className={`input ${inputClassName}`}
        type="url"
        placeholder="http://example.com/atom.xml"
        value={value}
        onChange={onChange}
      />

      <span className="icon is-right">
        {icon}
      </span>
    </div>

  )
}

AddFeedField.propTypes = {
  loadState: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AddFeedField
