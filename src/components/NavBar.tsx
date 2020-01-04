import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuOpenMobile } from '../store/selectors';
import { viewActions } from '../store/actions';

const NavBar = () => {
  const dispatch = useDispatch();
  const isHamburgerOpen = useSelector(menuOpenMobile);

  const toggle = useCallback(() => {
    dispatch(viewActions.toggleMenu());
  }, []);

  return (
    <nav className="navbar is-fixed-top is-light is-primary">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item">Open Feed</a>

          <a
            role="button"
            className={`navbar-burger ${isHamburgerOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isHamburgerOpen}
            onClick={toggle}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={`navbar-menu ${isHamburgerOpen ? 'is-active' : ''}`}>
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
