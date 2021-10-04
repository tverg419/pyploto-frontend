import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { LoginContext } from './LoginContext.jsx'
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

function Login(props) {

    const initialState = {
        username: '',
        password: ''
    }
    const {loginStatus, setLoginStatus} = useContext(LoginContext)
    const [login, setLogin] = useState(initialState)
    const history = useHistory()

    const changeLogin = (event) => {
        setLogin({...login, [event.target.name]: event.target.value})
    }
    
    async function submitLogin(event)  {
        event.preventDefault()

        await axiosInstance.post('token/obtain/', {
            username: login.username,
            password: login.password
        })
        .then(res => {
            if (res.status === 200) {
                axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
                localStorage.setItem('access_token', res.data.access)
                localStorage.setItem('refresh_token', res.data.refresh)
            } else {
                return res
            }
        })
        .then(res => {
            axiosInstance.get(`users/${login.username}`)
            .then(res => {
                localStorage.setItem('username', login.username)
                localStorage.setItem('user_id', res.data.id)
                history.push('/')
            })
        })
        .catch(error => console.error)
    }

    return (
        <div className='form login-form'>
            <h1>Login</h1>
            <Form onSubmit={submitLogin} className='d-grid gap-2'>
                <Form.Control type='text' name='username' placeholder='Username' value={login.username} onChange={changeLogin}></Form.Control>
                <Form.Control type='password' name='password' placeholder='Password' value={login.password}onChange={changeLogin}></Form.Control>
                <Button type='submit'>Login</Button>      
            </Form>
            <div className='form-footer'>
                <p>Don't have an account yet?</p>
                <Button href='/signup/'type="button" variant='link'>Sign-Up</Button>
            </div>
        </div>
    );
}

export default Login;