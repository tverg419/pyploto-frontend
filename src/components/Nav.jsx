import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg'
import { IoHome, IoLogOutOutline } from 'react-icons/io5'
import { GoSearch } from 'react-icons/go'
import { LoginContext } from './LoginContext.jsx'
import axiosInstance from '../axios.js';

function Nav(props) {

    const {loginStatus, setLoginStatus} = useContext(LoginContext)
    const history = useHistory()


    async function handleLogout() {
        const response = await axiosInstance.post('/blacklist/', {
          'refresh_token': localStorage.getItem('refresh_token')
        })
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        axiosInstance.defaults.headers['Authorization'] = null;
        setLoginStatus(false)
        history.push('/login')
        return response
      }
    
      
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
            <div className="nav">
                <a href='/'       ><IoHome/></a>
                <a href='/search' ><GoSearch/></a>
                <a href='/profile'><CgProfile/></a>
                <button onClick={handleLogout}><IoLogOutOutline/></button>
            </div>
        );
    }
}

export default Nav;