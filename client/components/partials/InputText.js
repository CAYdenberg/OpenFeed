const React = require('react')
const PropTypes = require('prop-types')

const InputText = props => {
  const id = `${name}`
  const [inputClass, rightIcon] = ((valid) => {
    
  })(props.valid)

  return (
    <div className="field">
      <p className="control has-icons-left has-icons-right">
        <label htmlFor={id}>{props.label}</label>
        <input className="input" name={props.name} type={props.type || 'text'} placeholder={props.placeholder} />
        <span className="icon is-left">
          <i className={`fa fa-${props.icon}`}></i>
        </span>
        <span className="icon is-right">
          <i className="fa fa-times"></i>
        </span>
      </p>
      <p className="help is-danger">Username not available</p>
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.label.isRequired,
  name: PropTypes.name.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  message: PropTypes.string,
}

export default InputText
