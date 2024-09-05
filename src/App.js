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
