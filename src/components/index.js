import React from 'react'
import {connect} from 'react-redux'

import {actions} from '../store/ui'
import {actions as postsActions} from '../store/posts'
import {openPost} from '../store/selectors'
import NavBar from './NavBar'
import SinglePostControls from './SinglePostControls'
import SinglePost from './SinglePost'
import ControlPanel from './ControlPanel'
import Timeline from './Timeline'
import Account from './Account'

const mapStateToProps = (state) => {
  return {
    view: state.posts.view,
    hamburgerIsOpen: state.ui.hamburgerIsOpen,
    openPost: openPost(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleHamburger: () => dispatch(actions.toggleHamburger()),
    closePost: () => dispatch(postsActions.closePost())
  }
}

const App = ({view, hamburgerIsOpen, toggleHamburger, openPost, closePost}) => {
  return (
    <React.Fragment>
      <NavBar
        hamburgerIsOpen={hamburgerIsOpen}
        toggleHamburger={toggleHamburger}
      />

      <main>
        <div className="container">
          <div className="columns is-centered">
            {openPost
              ? (
                <div className="column is-two-thirds-tablet">
                  <SinglePostControls closePost={closePost} post={openPost} />
                  <SinglePost post={openPost} />
                </div>
              )
              : (
                <React.Fragment>
                  <div className="column is-one-third">
                    <ControlPanel />
                  </div>
                  <div className="column">
                    {(view && view.type === 'page' && view.id === 'Account')
                      ? <Account />
                      : <Timeline />
                    }
                  </div>
                </React.Fragment>
              )
            }
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
