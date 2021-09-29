import React, { useState } from 'react';
import axiosInstance from '../axios.js'

function Login(props) {
    const initialState = {
        'username': '',
        'password': ''
    }
    const [login, setLogin] = useState(initialState)

    const handleChange = (event) => {
        setLogin({...login, [event.target.name]: event.target.value})
    }
    async function handleSubmit(event)  {
        event.preventDefault()

        await axiosInstance.post('token/obtain/', {
            username: login.username,
            password: login.password
        })
        .then(res => {
            axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            localStorage.setItem('username', login.username)
            localStorage.setItem('user_id', 1)
            return res
        })
        .catch(error => console.error)
        
        console.log(login)
        setLogin(initialState)
    }

    return (
        <div className='form login-form'>
            <h1> Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' value={login.username} onChange={handleChange}></input>
                <input type='password' name='password' placeholder='Password' value={login.password}onChange={handleChange}></input>
                <button type='submit'>Submit</button>      
            </form>
        </div>
    );
}

export default Login;