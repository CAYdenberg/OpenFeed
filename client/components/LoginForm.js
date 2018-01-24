const React = require('react')

const LoginForm = () => {
  return (
    <div className="container">
      <form className="login-form">

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email" />
            <span className="icon is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-right">
              <i className="fa fa-times"></i>
            </span>
          </p>
          <p className="help is-danger">Username not available</p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Password" />
            <span className="icon is-left">
              <i className="fa fa-envelope"></i>
            </span>
            <span className="icon is-right">
              <i className="fa fa-check"></i>
            </span>
          </p>
        </div>

        <button className="button is-primary">Primary</button>

      </form>
    </div>
  )
}

module.exports = LoginForm
