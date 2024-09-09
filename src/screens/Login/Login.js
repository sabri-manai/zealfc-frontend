import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link for redirection
import Button from "../../components/Button/Button"; // Assuming you have a Button component
import "./Login.css"; // Import the CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
      });
      
      if (response.data) {
        const { idToken } = response.data;
        setMessage("User logged in successfully");
        onLogin(idToken); // Call the onLogin function passed down from App
        navigate("/"); // Redirect to the home page
      } else {
        setMessage("Login failed: no data in response");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <Button
          text={loading ? "Logging in..." : "Login"} // Button text changes when loading
          onClick={handleLogin}
          styleType="default"
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
        {/* Link to the Register screen */}
        <div className="message-container">
        <p>Don't have an account?</p>
          <a href="/register">Register</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
