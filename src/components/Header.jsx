import React from 'react';

import styles from '../global.module.css';

const Header = ({ showBackClick, onBackClick }) => (
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
    </div>
  </nav>
);

export default Header;
