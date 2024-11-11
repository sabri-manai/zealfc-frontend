// src/components/ForgotPassword/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "../../components/Button/Button";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for redirecting

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      setMessage(response.data.message || "Password reset code sent successfully.");

      // Redirect to reset password page with email as state
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to send reset code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <Button
          text={loading ? "Sending..." : "Send Reset Code"}
          onClick={handleForgotPassword}
          styleType="default"
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
