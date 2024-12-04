import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "../../components/Button/Button3";
import "./ForgotPassword.css";
import homeBackground from '../../assets/images/home_background.png';

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
    <div className="forgot-password-layout">
      <div className="forgot-password-image-container">
        <img src={homeBackground} alt="Background" className="forgot-password-image" />
        <div className="noise-effect"></div>
      </div>
      <div className="forgot-password-form-container">
        <p className="forgot-password-title">FORGOT YOUR PASSWORD?</p>
        <form className="forgot-password-form">
          <div className="forgot-password-field">
            <span>Email:</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-password-input-line"
            />
          </div>
          <Button
            onClick={handleForgotPassword}
            variant="small"
            primaryText={loading ? "Sending..." : "Reset Code"}
            disabled={loading} // Disable button while loading
          />
        </form>
        {message && <p className="forgot-password-message">{message}</p>}
        <div className="login-links">
          <div className="login-link">
            <span>Already have an account?  </span>
            <Link to="/login" className="login-link-text"> Login</Link>
          </div>
          <div className="login-link">
            <span>Don't have an account?</span>
            <Link to="/register" className="login-link-text"> Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
