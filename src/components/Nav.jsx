import React, { useContext } from 'react';
import { Button } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { IoHome } from 'react-icons/io5'
import { GoSearch } from 'react-icons/go'
import { LoginContext } from './LoginContext.jsx'

function Nav(props) {

    const {loginStatus, setLoginStatus} = useContext(LoginContext)
      
    // ternary operator to switch nav bar
    if (loginStatus) {
        return (
            <div className="nav">
                <div>
                    <Button href='/login'  variant='light'>Log In</Button>
                    <Button href='/signup' variant='light'>Sign Up</Button>
                </div>
                
            </div>
        )
    } else {
        return (
            <div>

            <div className="nav nav-mobile">
                <a href='/'       ><IoHome/></a>
                <a href='/search' ><GoSearch/></a>
                <a href='/profile'><CgProfile/></a>
            </div>
            <div className="nav nav-desktop">
                <div>
                    <h2>Pyploto</h2>
                </div>
                <div>
                    <a href='/'       >Home</a>
                    <a href='/search' >Search</a>
                    <a href='/profile'>Profile</a>
                    <a href='/login'>Login</a>
                </div>
            </div>
            </div>
        );
    }
}

export default Nav;