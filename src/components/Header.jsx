import React from 'react';

import styles from '../global.module.css';
import { firebaseSignOut } from '../utils/firebase';
import bookmarkIcon from '../assets/bookmarks.svg';

const Header = ({ showBackClick, onBackClick, user, onSavedClick }) => (
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
      <div>
        <button onClick={() => onSavedClick()} style={{ background: 'none', border: 'none' }}>
          <img src={bookmarkIcon}  alt="Saved events" style={{ filter: `brightness(0) invert(1)`, height: '100%', width: 'auto' }} />
        </button>

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
    </div>
  </nav>
);

export default Header;
