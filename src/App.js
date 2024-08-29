// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { AboutUs } from "./components/AboutUs";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (idToken) => {
    localStorage.setItem("idToken", idToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("idToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} />
          {isAuthenticated && <Route path="/profile" element={<Profile />} />}
        </Routes>
        <h1 className="nyxerin-text">This is Nyxerin Font</h1>
        <h1 className="tomorrow-text">THIS IS TOMORROW FONT</h1>

      </div>
    </Router>
  );
}

export default App;
