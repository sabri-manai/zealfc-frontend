import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Button from "../../components/Button/Button"; // Assuming Button component is in the same folder structure
import "./Register.css"; // Import the CSS file

function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const validatePhoneNumber = (number) => {
    // Regex to validate phone number in E.164 format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(number);
  };

  const handleRegister = async () => {
    if (!first_name || !last_name || !password || !email || !phoneNumber) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Validate phone number format
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Please enter a valid phone number in E.164 format (e.g., +1234567890).");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        first_name,
        last_name,
        password,
        email,
        phone_number: phoneNumber,  // Include phone number in the request
      });
      setMessage(response.data.message || "User registered successfully");
      
      // Redirect to confirmation page and pass the email and password
      navigate("/confirm", { state: { email, password } });
      
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
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
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
          <input
            type="text"
            placeholder="Phone Number (e.g., +1234567890)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
        <div className="message-container">
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
