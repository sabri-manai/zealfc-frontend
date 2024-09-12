import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "../../components/Button/Button"; // Assuming you have a Button component
import "./Login.css"; // Import the CSS file

function Login({ onLogin }) {
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize the useNavigate hook

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
        // Extract idToken, accessToken, and refreshToken from response
        const { idToken, accessToken, refreshToken } = response.data;

        // Save tokens in localStorage
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

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
        navigate("/confirm", { state: { email } }); // Redirect to the confirmation page and pass the email
      } else {
        setMessage(error.response?.data?.message || "Login failed");
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
            type="email" // Changed to email
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="message-container">
          <p>Don't have an account?</p>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
