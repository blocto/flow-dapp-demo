import React from 'react'
import * as fcl from '@onflow/fcl'

const Login = ({ address }) => {
    const loginOrLogout = () => {
        if (address) {
            fcl.unauthenticate()
        } else {
            fcl.authenticate()
        }
    }

    return (
        <div>
            <button onClick={loginOrLogout}>
                {Boolean(address) ? 'Log out' : 'Log in'}
            </button>

            <div>
                Address: {address}
            </div>
        </div>
    );
}

export default Login
