// src/components/ResetPassword/ResetPassword.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import Button from "../../components/Button/Button";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate for redirecting

  const handleResetPassword = async () => {
    if (!email || !confirmationCode || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true); // Show loading state while resetting password
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
        email,
        confirmationCode,
        newPassword,
      });
      setMessage(response.data.message || "Password has been reset successfully.");

      // Redirect to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to reset password.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Enter confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <Button
          text={loading ? "Resetting..." : "Reset Password"}
          onClick={handleResetPassword}
          styleType="default"
          disabled={loading} // Disable button while loading
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
