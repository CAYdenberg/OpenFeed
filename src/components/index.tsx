import React from 'react';
import NavBar from './NavBar';
import ControlPanel from './ControlPanel';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';
import { isSettingsOpen, selectedPost } from '../store/selectors';
import Account from './Account';
import Notifications from './Notifications';

const App = () => {
  const post = useSelector(selectedPost);
  const settings = useSelector(isSettingsOpen);

  return (
    <React.Fragment>
      <NavBar />

      <main>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <ControlPanel />
            </div>
            <div className="column">
              {settings ? <Account /> : <Timeline />}
            </div>
          </div>
        </div>
      </main>

      <Notifications />
    </React.Fragment>
  );
};

export default App;
