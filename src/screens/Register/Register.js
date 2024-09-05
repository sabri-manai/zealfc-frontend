import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for redirection
import Button from "../../components/Button/Button"; // Assuming Button component is in the same folder structure
import "./Register.css"; // Import the CSS file

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password || !email) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        email,
      });
      setMessage(response.data.message || "User registered successfully");
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <Button
          text={loading ? "Registering..." : "Register"} // Button text changes when loading
          onClick={handleRegister}
          styleType="default"
        />
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
        {/* Link to the Login screen */}
        <div className="message-container">
        <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>

      </div>
    </div>
  );
}

export default Register;
