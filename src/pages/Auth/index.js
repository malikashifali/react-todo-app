import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NoPage from 'pages/Frontend/NoPage';
import ResetPassword from './ResetPassword';
import ResetPasswordForm from './ResetPassword/ResetPasswordForm';

export default function Index() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='reset-password' element={<ResetPassword />} />
      <Route path='reset-password/:id' element={<ResetPasswordForm />} />
      <Route path='*' element={<NoPage />} />
    </Routes>
  );
}
