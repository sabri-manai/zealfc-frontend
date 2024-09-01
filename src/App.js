// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Footer from "./components/Footer/Footer";

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
        <Footer />  {/* Add Footer component here */}

      </div>
    </Router>
  );
}

export default App;
