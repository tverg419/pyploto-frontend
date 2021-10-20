import React from 'react';
import { CgProfile } from 'react-icons/cg'
import { IoHome } from 'react-icons/io5'
import { GoSearch } from 'react-icons/go'
import { useLogin } from './LoginContext.jsx'

function Nav(props) {
    
    const { loginStatus } = useLogin()
    console.log(loginStatus)
    // ternary operator to switch nav bar
    if (loginStatus) {
        return (
            <div>
                <div className="nav nav-mobile">
                    <a href='/home'       ><IoHome/></a>
                    <a href='/search' ><GoSearch/></a>
                    <a href='/profile'><CgProfile/></a>
                </div>
                <div className="nav nav-desktop">
                <div>
                    <h2>Pyploto</h2>
                </div>
                <div>
                    <a href='/home'   >Home</a>
                    <a href='/search' >Search</a>
                    <a href='/profile'>Profile</a>
                    <a href='/logout'>Logout</a>
                </div>
            </div>
            </div>
        )
    } else {
        return (
            <div>

            <div className="nav nav-mobile">
                
            </div>
            <div className="nav nav-desktop">
                <div>
                    <h2>Pyploto</h2>
                </div>
                <div>
                    <a href='/register'>Register</a>
                    <a href='/login'>Login</a>
                </div>
            </div>
            </div>
        );
    }
}

export default Nav;