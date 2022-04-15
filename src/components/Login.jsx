import React from 'react'
import { signInWithGoogle } from '../utils/firebase'

const Login = () => {
    return (
        <div> 
            <button onClick={() => signInWithGoogle()}> Sign in </button>
        </div>
    )
}

export default Login

