import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import AboutUs from '../components/AboutUs';
import LoginRoutes from './LoginRoutes';

function AppRoutes({ isAuthenticated, onLogin }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/*" element={<LoginRoutes onLogin={onLogin} />} />
      {isAuthenticated && <Route path="/profile" element={<Profile />} />}
    </Routes>
  );
}

export default AppRoutes;
