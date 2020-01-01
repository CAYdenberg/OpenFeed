import React from 'react';
import NavBar from './NavBar';
import ControlPanel from './ControlPanel';
import Timeline from './Timeline';
import { useSelector } from 'react-redux';
import { isSettingsOpen } from '../store/selectors';
import Account from './Account';
// import Alert from './Alert';

const App = () => {
  const settings = useSelector(isSettingsOpen);

  return (
    <React.Fragment>
      <NavBar hamburgerIsOpen={false} toggleHamburger={Boolean} />

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

      {/* <Alert /> */}
    </React.Fragment>
  );
};

export default App;
