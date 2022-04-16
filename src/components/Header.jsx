import React from 'react';

import styles from '../global.module.css';
import { firebaseSignOut } from '../utils/firebase';

const Header = ({ showBackClick, onBackClick, user }) => (
  <nav style={{backgroundColor: '#4e2a84'}} className="navbar">
    <div className="container-fluid">
      <span
        className={`navbar-brand ${showBackClick ? styles.hoverPointer : ''}`}
        style={{ fontWeight: '800', color: 'white' }}
        onClick={ () => (showBackClick) && onBackClick() }
      >
        {
          showBackClick && (
            <span style={{ paddingRight: "1em" }}>❮</span>
          )
        }
        Happening
      </span>
      {
        user && (
          <span>
            <button
              onClick={() => window.confirm('Are you sure you want to sign out?') && firebaseSignOut()}
              className="btn"
              style={{ color: 'white', borderColor: 'white' }}
            >
              Sign out
            </button>
          </span>
        )
      }
    </div>
  </nav>
);

export default Header;
