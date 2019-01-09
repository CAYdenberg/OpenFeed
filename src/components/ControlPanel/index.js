import React from 'react'
import {connect} from 'react-redux'

import Feeds from './Feeds'
import Settings from './Settings'
import {actions} from '../../store/ui'
import {actions as postsActions} from '../../store/posts'

const mapStateToProps = (state) => {
  return {
    panel: state.ui.panel,
    view: state.posts.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPanel: panel => dispatch(actions.setControlPanel(panel)),
    setView: view => dispatch(postsActions.setView(view))
  }
}

const ControlPanel = ({panel, setPanel, view, setView}) => {
  return (
    <nav className="panel">
      <p className="panel-tabs">
        {['Feeds', 'Settings'].map(name =>
          <a
            className={panel === name ? 'is-active' : ''}
            onClick={() => setPanel(name)}
            key={name}
          >
            {name}
          </a>
        )}
      </p>

      {panel === 'Feeds'
        ? <Feeds />
        : <Settings view={view} setView={setView} />
      }
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
