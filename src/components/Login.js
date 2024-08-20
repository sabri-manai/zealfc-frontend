// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.data) {
        const { idToken, accessToken, refreshToken } = response.data;
        setMessage("User logged in successfully");
        console.log("ID Token:", idToken);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        onLogin(idToken);
      } else {
        setMessage("Login failed: no data in response");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Login;
