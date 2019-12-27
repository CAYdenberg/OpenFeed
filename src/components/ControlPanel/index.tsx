import React, { useCallback } from 'react';
import Feeds from './Feeds';
import { useSelector, useDispatch } from 'react-redux';
import { selectedPanel } from '../../store/selectors';
import { viewActions } from '../../store/actions';

const ControlPanel = () => {
  const panel = useSelector(selectedPanel);
  const dispatch = useDispatch();

  const setPanel = useCallback(panel => {
    dispatch(viewActions.viewPanel(panel));
  }, []);

  return (
    <nav className="panel control-panel">
      <p className="panel-tabs">
        {['Feeds', 'Settings'].map(name => (
          <a
            className={
              panel.toLowerCase() === name.toLowerCase() ? 'is-active' : ''
            }
            onClick={() => setPanel(name)}
            key={name}
          >
            {name}
          </a>
        ))}
      </p>

      <div className={/*panelHiddenMobile ? 'is-hidden-mobile' :*/ undefined}>
        <Feeds />

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
