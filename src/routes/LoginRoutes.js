import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ConfirmAccount from '../screens/Login/ConfirmAccount';

function LoginRoutes({ onLogin }) {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirm" element={<ConfirmAccount onLogin={onLogin} />} />
    </Routes>
  );
}

export default LoginRoutes;
