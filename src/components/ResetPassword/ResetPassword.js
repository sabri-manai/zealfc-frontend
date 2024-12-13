import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button3";
import "./ResetPassword.css";
import homeBackground from '../../assets/images/home_background.avif';

function ResetPassword() {
  const [step, setStep] = useState(1); // Step 1: Enter confirmation code
  const [confirmationCode, setConfirmationCode] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleNextStep = async () => {
    if (!confirmationCode) {
      setMessage("Please enter the confirmation code.");
      return;
    }

    // Optionally, verify the confirmation code with the server
    // For this example, we'll proceed to the next step
    setStep(2);
    setMessage("");
  };

  const handleResetPassword = async () => {
    if (!email || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-layout">
      <div className="reset-password-image-container">
        <img src={homeBackground} alt="Background" className="reset-password-image" />
        <div className="noise-effect"></div>
      </div>
      <div className="reset-password-form-container">
        <p className="reset-password-title">
          {step === 1 ? "ENTER CONFIRMATION CODE" : "RESET YOUR PASSWORD"}
        </p>
        <form className="reset-password-form">
          {step === 1 && (
            <>
              <div className="reset-password-field">
                <span>Confirmation Code:</span>
                <input
                  type="text"
                  placeholder="Enter confirmation code"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="reset-password-input-line"
                />
              </div>
              <Button
                onClick={handleNextStep}
                variant="small"
                primaryText="Next"
                disabled={loading}
              />
            </>
          )}
          {step === 2 && (
            <>
              <div className="reset-password-field">
                <span>Email:</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="reset-password-input-line"
                />
              </div>
              <div className="reset-password-field">
                <span>New Password:</span>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="reset-password-input-line"
                  />
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleResetPassword}
                variant="small"
                primaryText={loading ? "Resetting..." : "Reset"}
                disabled={loading}
              />
            </>
          )}
        </form>
        {message && <p className="reset-password-message">{message}</p>}
        <div className="login-links">
          <div className="login-link">
            <span>Don't have an account?</span>
            <Link to="/register" className="login-link-text"> Register</Link>
          </div>
          <div className="login-link">
            <span>Already have an account?</span>
            <Link to="/login" className="login-link-text"> Login</Link>
          </div>
          <div className="login-link">
            <span>Forgot your password?</span>
            <Link to="/forgot-password" className="login-link-text"> Reset Password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
