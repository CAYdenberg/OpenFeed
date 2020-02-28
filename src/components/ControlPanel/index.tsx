import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedPanel, panelOpenMobile } from '../../store/selectors';
import { viewActions } from '../../store/actions';
import Feeds from './Feeds';
import Settings from './Settings';

const ControlPanel = () => {
  const dispatch = useDispatch();
  const panel = useSelector(selectedPanel);
  const isPanelOpenMobile = useSelector(panelOpenMobile);

  const setPanel = useCallback(panel => {
    dispatch(viewActions.viewPanel(panel));
  }, []);

  return (
    <nav className="panel control-panel">
      <p className="panel-tabs">
        {['Feeds', 'Settings'].map(name => (
          <a
            className={
              panel.toLowerCase() === name.toLowerCase() && isPanelOpenMobile
                ? 'is-active'
                : panel.toLowerCase() === name.toLowerCase()
                ? 'is-active-tablet'
                : ''
            }
            onClick={() => setPanel(name)}
            key={name}
          >
            {name}
          </a>
        ))}
      </p>

      <div className={isPanelOpenMobile ? undefined : 'is-hidden-mobile'}>
        {panel === 'feeds' ? <Feeds /> : <Settings />}
      </div>
    </nav>
  );
};

export default ControlPanel;
