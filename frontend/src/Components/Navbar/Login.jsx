import { Link } from "react-router-dom";
import "./Popup.css";
import React, { useState } from "react";

export const Popup = ({ isOpen, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8090/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const { token } = await response.json();
      sessionStorage.setItem("jwt", token);
      alert("Login successful!");
      onClose();
    } else {
      const errorMessage = await response.text();
      alert(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="links">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <Link to="/register" className="sign-up">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};
