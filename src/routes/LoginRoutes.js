import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ConfirmAccount from '../screens/Login/ConfirmAccount';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/ResetPassword/ResetPassword';

function LoginRoutes({ onLogin }) {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm" element={<ConfirmAccount onLogin={onLogin} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default LoginRoutes;
