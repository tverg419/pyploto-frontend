import React, { useState } from 'react';
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
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
            <Form onSubmit={handleSubmit}>
                <Form.Control type='text' name='username' placeholder='Username' value={login.username} onChange={handleChange}></Form.Control>
                <Form.Control type='password' name='password' placeholder='Password' value={login.password}onChange={handleChange}></Form.Control>
                <Button type='submit'>Submit</Button>      
            </Form>
        </div>
    );
}

export default Login;