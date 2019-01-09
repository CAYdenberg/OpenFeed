import React from 'react'
import {connect} from 'react-redux'

import ControlPanel from './ControlPanel'
import Timeline from './Timeline'
import Account from './Account'

const mapStateToProps = (state) => {
  return {
    view: state.posts.view
  }
}

const App = ({view}) => {
  return (
    <div className="app-inner container">
      <nav className="navbar">

        <div className="navbar-brand">
          <a className="navbar-item">Pheed</a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item">About</a>
            <a className="navbar-item">GitHub</a>
          </div>
        </div>
      </nav>

      <div className="columns">
        <div className="column is-one-third">
          <ControlPanel />
        </div>

        <div className="column">
          {(view && view.type === 'page' && view.id === 'Account')
            ? <Account />
            : <Timeline />
          }
        </div>
      </div>

    </div>
  )
}

export default connect(mapStateToProps)(App)
