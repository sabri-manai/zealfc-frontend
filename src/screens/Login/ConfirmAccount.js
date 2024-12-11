// src/pages/ConfirmAccount/ConfirmAccount.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button3'; // Updated import
import './ConfirmAccount.css';

function ConfirmAccount({ onLogin }) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill email and password from previous state
  useEffect(() => {
    if (location.state) {
      setEmail(location.state.email || '');
      setPassword(location.state.password || '');
    }
  }, [location]);

  const handleConfirm = async () => {
    if (!confirmationCode || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/confirm`, {
        email,
        confirmationCode,
        password,
      });

      if (response.data && response.data.IdToken) {
        const { IdToken, AccessToken, RefreshToken } = response.data;
        setMessage("Account confirmed and logged in successfully!");

        // Call onLogin with all tokens
        onLogin(IdToken, AccessToken, RefreshToken);

        // Redirect to homepage after confirmation
        navigate("/");
      } else {
        setMessage("No valid tokens received from the backend.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Account confirmation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="confirm-container">
      <div className="confirm-box">
        <h2>Confirm Your Account</h2>
        <input
          type="text"
          placeholder="Enter confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="input-field"
        />
        <Button
          variant="small"
          primaryText={loading ? "..." : "Confirm"}
          onClick={handleConfirm}
          styleType="default"
        />
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default ConfirmAccount;
