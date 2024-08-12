import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from 'contexts/AuthContext'
import PrivateRoute from 'components/PrivateRoute'

export default function Index() {
  const {state} = useAuthContext()
  const {isAuthenticated} = state
  return (
    <Routes>
     <Route path='/*' element={<Frontend />} /> 
     <Route path='auth/*' element={!isAuthenticated ? <Auth />: <Navigate to='/dashboard' />} /> 
     <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard} />} /> 
    </Routes>
  )
}
