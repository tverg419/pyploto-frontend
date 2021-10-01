import React, { useState, useContext } from 'react';
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
import {LoginContext} from './LoginContext'

function Signup(props) {

    const initialState = {
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    }
    const [form, setForm] = useState(initialState)
    const {loginStatus, setLoginStatus} = useContext(LoginContext)

    // sets form when inputs are changed
    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
    // submits form to create a new user
    async function handleSubmit(event) {
        event.preventDefault()
        await axiosInstance.post('/users/create/',
        {
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            username: form.username,
            password: form.password,
        })
        // logs the newly made user in 
        .then(() => {
            axiosInstance.post('token/obtain/', {
                username: form.username,
                password: form.password
            })
            .then(res => {
                axiosInstance.defaults.headers['Authorization'] = `JWT ${res.data.access}`
                localStorage.setItem('access_token', res.data.access)
                localStorage.setItem('refresh_token', res.data.refresh)
                localStorage.setItem('username', form.username)
                localStorage.setItem('user_id', 1)
                return res
            })
        })
        .catch(error => console.error)
        // sets login to true
        setLoginStatus(true)
    }

    return (
        <div className='form signup-form'>
            <h1>Sign-Up</h1>
            <Form onSubmit={handleSubmit} className='d-grid'>
                <div className='d-grid'> 
                <Form.Group className='d-grid gap-2'>
                    <Form.Control type='email' name='email'      placeholder='Email'      value={form.email}      onChange={handleChange}></Form.Control> 
                    <Form.Control type='text'  name='first_name' placeholder='First Name' value={form.first_name} onChange={handleChange}></Form.Control>
                    <Form.Control type='text'  name='last_name'  placeholder='Last Name'  value={form.last_name}  onChange={handleChange}></Form.Control>
                    <Form.Control type='text'  name='username'   placeholder='Username'   value={form.username}   onChange={handleChange}></Form.Control>
                    <Form.Control type='text'  name='password'   placeholder='Password'   value={form.password}   onChange={handleChange}></Form.Control>
                    <Button type='submit'>Sign-Up</Button>                
                </Form.Group>
                </div>
            <div className="input-group">
                <p>Have an account already?</p>
                <Button href='login/'type="button" variant='link'>Log-In</Button>
                </div>

            </Form>
        </div>
    );
}

export default Signup;