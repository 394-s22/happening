import React from 'react'

import Header from './Header';
import { signInWithGoogle } from '../utils/firebase'

const Login = () => (
  <div>
    <Header />
    <div className='container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1
        style={{
          color: '#4e2a84',
          marginTop: '25vh',
          fontWeight: 'bolder',
          fontSize: '2.5em'
        }}
      >
        Happening
      </h1>

      <h6 data-cy='test' style={{ textAlign: 'center'}}>
        Please sign in with your school affiliated email
      </h6>

      <button
        onClick={() => signInWithGoogle()}
        className="btn"
        data-cy="btn-sign-in"
        style={{
          width: '50%',
          color: '#4e2a84',
          borderColor: '#4e2a84',
          borderWidth: '2px',
          fontWeight: 'bold',
          marginTop: '1em'
        }}
      >
        Sign in
      </button>
    </div>
  </div>
);

export default Login;
