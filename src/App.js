import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Modified handleLogin to store all tokens
  const handleLogin = (idToken, accessToken, refreshToken) => {
    // Store all tokens in localStorage
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    // Mark user as authenticated
    setIsAuthenticated(true);
  };

  // Logout handler, clears all tokens
  const handleLogout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Pass isAuthenticated and handleLogout to the Navbar */}
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        
        {/* Pass isAuthenticated and handleLogin to AppRoutes */}
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        
        <Footer />  {/* Add Footer component */}
      </div>
    </Router>
  );
}

export default App;
