import React, { useState } from 'react';
import axiosInstance from '../axios.js'

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
                return res
            })
        })

        .catch(error => console.error)
        setForm(initialState)
    }

    return (
        <div className='form signup-form'>
            <h1>Sign-Up</h1>
            <form onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder='Email' value={form.email} onChange={handleChange}></input>
                <input type='text' name='first_name' placeholder='First Name'value={form.first_name} onChange={handleChange}></input>
                <input type='text' name='last_name' placeholder='Last Name' value={form.last_name} onChange={handleChange}></input>
                <input type='text' name='username' placeholder='Username' value={form.username} onChange={handleChange}></input>
                <input type='password' name='password' placeholder='Password' value={form.password}onChange={handleChange}></input>
                <button type='submit'>Submit</button>                
            </form>
        </div>
    );
}

export default Signup;