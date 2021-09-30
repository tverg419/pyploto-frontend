import React, { useState } from 'react';
import axiosInstance from '../axios.js'
import { Form, Button } from 'react-bootstrap'
function Signup(props) {

    const initialState = {
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
    }

    const [form, setForm] = useState(initialState)

    const handleChange = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    
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
        setForm(initialState)
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
                <Form.Group>
                <p>Have an account?</p><Button variant='link'>Log In</Button>
                    </Form.Group>
                </div>

            </Form>
        </div>
    );
}

export default Signup;