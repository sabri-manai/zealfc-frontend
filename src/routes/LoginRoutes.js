import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../screens/Login/Login'; // Adjust the path based on your folder structure
import Register from '../screens/Register/Register'; // Adjust the path based on your folder structure

function LoginRoutes({ onLogin }) {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default LoginRoutes;
