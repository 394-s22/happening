import React from 'react';

import styles from '../global.module.css';
import { firebaseSignOut, confirmSignOut } from '../utils/firebase';
import bookmarkIcon from '../assets/bookmarks.svg';

const Header = ({ showBackClick, onBackClick, user, onSavedClick, onAddClick }) => (
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
        Happened
      </span>
      <div>
        <button onClick={() => onAddClick()} style={{ color: '#ffffff', background: 'none', border: 'none', fontSize: '2em', verticalAlign: 'middle' }}>
          +
        </button>
        <button data-cy="bookmark-button" data-testid="bookmark-button" onClick={() => onSavedClick()} style={{ background: 'none', border: 'none', verticalAlign: 'middle' }}>
          <img src={bookmarkIcon}  alt="Saved events" style={{ filter: `brightness(0) invert(1)`, height: '120%', width: 'auto', marginRight: '0.5em' }} />
        </button>

        {
          user && (
            <span>
              <button
                data-cy="btn-sign-out"
                data-testid="btn-sign-out"
                onClick={() => confirmSignOut()}
                className="btn"
                style={{ color: 'white', borderColor: 'white', verticalAlign: 'middle'  }}
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
