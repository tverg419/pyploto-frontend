import React, { useContext, useState, useEffect } from 'react'

const LoginContext = React.createContext()

export function useLogin() {
    return useContext(LoginContext)
}

export function LoginProvider({ children }) {
    
    const [loginStatus, setLoginStatus] = useState()

    const value = {
        loginStatus,
        setLoginStatus,
    }
    
    useEffect(()=> {
        const isLoggedIn = localStorage.getItem('loggedIn')
        
        if (isLoggedIn) {
            setLoginStatus(true)
        } else {
            setLoginStatus(false)
        }
    }, [])
    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}