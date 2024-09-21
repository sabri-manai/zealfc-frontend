import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import AboutUs from '../components/AboutUs';
import LoginRoutes from './LoginRoutes';

function AppRoutes({ isAuthenticated, onLogin, refreshTokens, handleLogout }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/*" element={<LoginRoutes onLogin={onLogin} />} />
      
      {/* Render Profile only when authenticated */}
      {isAuthenticated && (
        <Route 
          path="/profile" 
          element={<Profile refreshTokens={refreshTokens} handleLogout={handleLogout} />}
        />
      )}
    </Routes>
  );
}

export default AppRoutes;
