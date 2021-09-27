import React, { useState } from 'react';
import { Link } from 'react-router-dom'
// import LoginContext from './LoginContext.jsx'

function Nav(props) {

    // let loginStatus = React.useContext(LoginContext)
    const loginStatus = true
    if (loginStatus) {
        return (
            <div className="nav">
                <div>
                    <Link to='/feed'>Feed</Link>
                    <Link to ='/search'>Search</Link>
                </div>            
                <div>
                    <h1>Pyploto</h1>
                </div>            
                <div>
                    <Link to='/profile'>Profile</Link>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                </div>
                
            </div>
    );
    } else {
        return (
            <div className="nav">
            </div>
        )
    }
}

export default Nav;