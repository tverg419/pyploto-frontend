import React, { useContext, useState } from 'react'

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
    
    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}