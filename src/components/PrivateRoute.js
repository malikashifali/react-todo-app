import { useAuthContext } from 'contexts/AuthContext'
import Login from 'pages/Auth/Login'
import React from 'react'


export default function PrivateRoute({ Component }) {
    const { state } = useAuthContext()
    const { isAuthenticated } = state
    if (!isAuthenticated) {
        return <Login />
    }
    return (
       <>
        <Component />
       </>
    )
}
