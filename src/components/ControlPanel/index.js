import React from 'react'
import {connect} from 'react-redux'

import Feeds from './Feeds'
import Settings from './Settings'
import {actions} from '../../store/ui'

const mapStateToProps = (state) => {
  return {
    panel: state.ui.panel,
    panelHiddenMobile: state.ui.panelHiddenMobile,
    view: state.posts.view
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPanel: panel => dispatch(actions.setControlPanel(panel)),
    reqCloseMobile: () => dispatch(actions.reqCloseMobile()),
    setView: view => dispatch(actions.setView(view)),
  }
}

const ControlPanel = ({panel, setPanel, view, setView, panelHiddenMobile, reqCloseMobile}) => {
  return (
    <nav className="panel control-panel">
      <p className="panel-tabs">
        {['Feeds', 'Settings'].map(name =>
          <a
            className={(panel === name && !panelHiddenMobile) ? 'is-active' : ''}
            onClick={() => setPanel(name)}
            key={name}
          >
            {name}
          </a>
        )}
      </p>

      <div className={panelHiddenMobile ? 'is-hidden-mobile' : undefined}>
        {panel === 'Feeds'
          ? <Feeds reqCloseMobile={reqCloseMobile} setView={setView} />
          : <Settings view={view} setView={setView} />
        }
      </div>
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
