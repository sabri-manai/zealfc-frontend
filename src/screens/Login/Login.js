import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Button from "../../components/Button/Button"; 
import "./Login.css"; 

function Login({ onLogin }) {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data) {
        // Extract idToken, accessToken, refreshToken, and possibly user details
        const { idToken, accessToken, refreshToken, userId, firstName } = response.data;

        // Save tokens and user info in localStorage
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);  // Save userId
        localStorage.setItem("firstName", firstName);  // Save firstName

        // Set success message
        setMessage("User logged in successfully");

        // Call onLogin to mark the user as authenticated in the parent component
        onLogin(idToken);

        // Redirect to the home page
        navigate("/");
      } else {
        setMessage("Login failed: no data in response");
      }
    } catch (error) {
      if (error.response?.data?.error === "UserNotConfirmedException") {
        setMessage("Please confirm your account first.");
        navigate("/confirm", { state: { email } }); // Redirect to confirmation page with email
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-container">
          <input
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            aria-label="Email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            aria-label="Password"
          />
        </div>
        <Button
          text={loading ? "Logging in..." : "Login"} 
          onClick={handleLogin}
          styleType="default"
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
        <div className="message-container">
          <p>Don't have an account?</p>
          <a href="/register">Register</a>
        </div>
        <div className="message-container">
          <p>Forgot your password?</p>
          <a href="/forgot-password">Reset Password</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
  