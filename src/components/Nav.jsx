import React from 'react';
import { Button } from 'react-bootstrap'
// import LoginContext from './LoginContext.jsx'

function Nav({ handleLogout }) {

    // let loginStatus = React.useContext(LoginContext)
    const loginStatus = true
    if (loginStatus) {
        return (
            <div className="nav">
                <div className='nav-left'>
                    <Button href='/'       variant='light'>Feed</Button>
                    <Button href='/search' variant='light'>Search</Button>
                </div>            
                <div className='nav-center'>
                    <h1>Pyploto</h1>
                </div>            
                <div className='nav-right'>
                    <Button href='/profile' variant='light'>Profile</Button>
                    {/* <Button href='/Login' variant='light'>Login</Button> */}
                    <Button variant='dark'onClick={handleLogout}>Logout</Button>
                </div>
                
            </div>
    );
    } else {
        return (
            <div className="nav">
                <div className='nav-left'>
                </div>            
                <div className='nav-center'>
                    <h1>Pyploto</h1>
                </div>            
                <div className='nav-right'>
                    {/* <button onClick={handleLogout}>Logout</button> */}
                </div>
                
            </div>
        )
    }
}

export default Nav;