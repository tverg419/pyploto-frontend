import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useLogin } from './LoginContext.jsx'
import axiosInstance from '../axios.js'
import { MinLengthPWValidator, UppercasePWValidator, NumericPWValidator, SpecialCharacterPWValidator } from '../validators.js';
import { Form, Button } from 'react-bootstrap'

function Login(props) {

    const initialState = {
        username: '',
        password: ''
    }
    const {setLoginStatus} = useLogin()
    const [login, setLogin] = useState(initialState)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const history = useHistory()

    const minLengthValidator = new MinLengthPWValidator(8)
    const uppercaseValidator = new UppercasePWValidator()
    const numericValidator = new NumericPWValidator()
    const specialCharValidator = new SpecialCharacterPWValidator()
    const errors = []

    const validatePassword = (str) => {
        if (minLengthValidator.validate(str) === false) {
            errors.push(`Must be ${minLengthValidator.getLength()} characters long`)
        }
        if (uppercaseValidator.validate(str) === false) {
            errors.push(`Must contain at least one uppercase letters`)
        }
        if (numericValidator.validate(str) === false) {
            errors.push(`Must contain at least one number (0-9)`)
        }
        if (specialCharValidator.validate(str) === false) {
            errors.push(`Must contain at least one special character (!@#$%^&*)`)
        }
        if (errors.length === 0) {
            setIsPasswordValid(true)
        } else {
            return errors
        }
    }

    async function changeLogin(event) {
        await setLogin({...login, [event.target.name]: event.target.value})
        validatePassword(login.password)
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
                localStorage.setItem('loggedIn', true)
                setLoginStatus(true)
                history.push('/')
            })
        })
        .catch(error => console.error)
    }
    console.log(validatePassword(login.password))
    return (
        <div className='form login-form'>
            <h1>Login</h1>
            <Form onSubmit={submitLogin} className='d-grid gap-2'>
                <Form.Control type='text' name='username' placeholder='Username' value={login.username} onChange={changeLogin}></Form.Control>
                <Form.Control type='password' name='password' placeholder='Password' value={login.password}onChange={changeLogin}></Form.Control>
                { isPasswordValid 
                ? null
                : errors.map(err => {
                    return (
                        <p>{err}</p>
                    );
                    })   
                }
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