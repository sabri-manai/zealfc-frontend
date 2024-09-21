import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to refresh tokens using refreshToken
  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("No refresh token available");
      return false;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh tokens");
      }

      const { idToken, accessToken } = await response.json();
      // Update the tokens in localStorage
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);

      console.log("Tokens refreshed successfully");
      return true;
    } catch (error) {
      console.error("Error refreshing tokens:", error);
      handleLogout(); // Optional: Logout if token refresh fails
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Modified handleLogin to store all tokens
  const handleLogin = (idToken, accessToken, refreshToken) => {
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
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
        {/* Pass isAuthenticated, handleLogout, and refreshTokens to the Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          refreshTokens={refreshTokens}
        />
        
        {/* Pass isAuthenticated and handleLogin to AppRoutes */}
        <AppRoutes isAuthenticated={isAuthenticated} onLogin={handleLogin} />
        
        <Footer />  {/* Add Footer component */}
      </div>
    </Router>
  );
}

export default App;
