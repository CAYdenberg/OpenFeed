import React from 'react'
import {connect} from 'react-redux'

import {actions} from '../store/ui'
import NavBar from './NavBar'
import ControlPanel from './ControlPanel'
import Timeline from './Timeline'
import Account from './Account'
import Alert from './Alert'

const mapStateToProps = (state) => {
  return {
    view: state.ui.view,
    hamburgerIsOpen: state.ui.hamburgerIsOpen,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHamburger: () => dispatch(actions.toggleHamburger()),
  }
}

const App = ({view, hamburgerIsOpen, toggleHamburger}) => {
  return (
    <React.Fragment>
      <NavBar
        hamburgerIsOpen={hamburgerIsOpen}
        toggleHamburger={toggleHamburger}
      />

      <main>
        <div className="container">
          <div className="columns is-centered">
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
      </main>

      <Alert />
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
