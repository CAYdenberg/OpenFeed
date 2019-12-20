import React from 'react';
import Feeds from './Feeds';

const ControlPanel = () => {
  return (
    <nav className="panel control-panel">
      <p className="panel-tabs">
        {['Feeds', 'Settings'].map(name => (
          <a
            className={
              /* panel === name && !panelHiddenMobile ? 'is-active' : */ ''
            }
            onClick={Boolean}
            key={name}
          >
            {name}
          </a>
        ))}
      </p>

      <div className={/*panelHiddenMobile ? 'is-hidden-mobile' :*/ undefined}>
        <Feeds reqCloseMobile={Boolean} setView={Boolean} />

        {/** panel === 'Feeds' ? (
          <Feeds reqCloseMobile={reqCloseMobile} setView={setView} />
        ) : (
          <Settings view={view} setView={setView} />
        ) **/}
      </div>
    </nav>
  );
};

export default ControlPanel;
