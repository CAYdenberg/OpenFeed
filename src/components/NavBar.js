import React from 'react';

const NavBar = ({ hamburgerIsOpen, toggleHamburger }) => {
  return (
    <nav className="navbar is-fixed-top is-light is-primary">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">Open Feed</a>

          <a
            role="button"
            className={`navbar-burger ${hamburgerIsOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={hamburgerIsOpen}
            onClick={toggleHamburger}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${hamburgerIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <a
              className="navbar-item"
              href="https://github.com/CAYdenberg/OpenFeed"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
