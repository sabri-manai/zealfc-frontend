import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button3";
import "./Login.css";
import homeBackground from "../../assets/images/home_background.avif";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        const { idToken, accessToken, refreshToken, userId, firstName } = response.data;

        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("firstName", firstName);

        setMessage("User logged in successfully");
        onLogin(idToken);
        navigate("/");
      } else {
        setMessage("Login failed: no data in response");
      }
    } catch (error) {
      if (error.response?.data?.error === "UserNotConfirmedException") {
        setMessage("Please confirm your account first.");
        navigate("/confirm", { state: { email, password } });
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-image-container">
        <img src={homeBackground} alt="Background" className="login-image" />
        <div className="noise-effect"></div>
      </div>
      <div className="login-form-container">
        <p className="login-title">WELCOME BACK!</p>
        <form className="login-form">
          <div className="login-field">
            <span>Email:</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input-line"
            />
          </div>
          <div className="login-field">
            <span>Password:</span>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input-line"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "SHOW"}
              </span>
            </div>
          </div>
          <Button
            variant="small"
            primaryText={loading ? "Logging in..." : "Login"}
            onClick={handleLogin}
          />
        </form>
        {message && <p className="login-message">{message}</p>}
        <div className="login-links">
          <div className="login-link">
            <span>Don't have an account?</span>
            <Link to="/register" className="login-link-text"> Register</Link>
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

export default Login;
