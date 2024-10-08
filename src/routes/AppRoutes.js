import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import GameDetails from '../screens/GameDetails/GameDetails';
import LoginRoutes from './LoginRoutes';

function AppRoutes({ isAuthenticated, onLogin, refreshTokens, handleLogout }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games/:gameId" element={<GameDetails />} /> {/* Add the GameDetails route */}
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
