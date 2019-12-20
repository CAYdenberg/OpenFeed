import React from 'react';
import NavBar from './NavBar';
import ControlPanel from './ControlPanel';
import Timeline from './Timeline';
// import Account from './Account';
import Alert from './Alert';

const App = () => {
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
              <Timeline />
              {/** view && view.type === 'page' && view.id === 'Account' ? (
                <Account />
              ) : (
                <Timeline />
              ) **/}
            </div>
          </div>
        </div>
      </main>

      {/* <Alert /> */}
    </React.Fragment>
  );
};

export default App;
