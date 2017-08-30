const React = require('react')
const ReactDOM = require('react-dom')

const LoginForm = require('./components/LoginForm')

const Base = () =>
  <div>
    <h1>Hello, world</h1>
    <LoginForm />
  </div>

ReactDOM.render(
  <Base />,
  document.getElementById('app-root')
)
