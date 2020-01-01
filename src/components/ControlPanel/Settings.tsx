import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isSettingsOpen } from '../../store/selectors';
import { viewActions } from '../../store/actions';

export const Settings = () => {
  const isActive = useSelector(isSettingsOpen);
  const dispatch = useDispatch();

  const openSettings = useCallback(() => {
    dispatch(viewActions.viewSettings(''));
  }, []);

  return (
    <a
      className={`panel-block ${isActive ? 'is-active' : ''}`}
      onClick={openSettings}
    >
      Account
    </a>
  );
};

export default Settings;
