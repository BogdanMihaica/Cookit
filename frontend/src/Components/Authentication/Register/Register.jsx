import { useState } from "react";
import Footer from "../../Footer/Footer";
import { Navbar } from "../../Navbar/Navbar";
import "./Register.css";

export function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8090/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("User succesfully registered");
    }
  };

  return (
    <div className="bg">
      <Navbar />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              required
              onChange={handleChange}
            />
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
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" required onChange={handleChange} />
          </div>
          <div>
            <label>Confirm Email:</label>
            <input
              type="email"
              name="confirmEmail"
              required
              onChange={handleChange}
            />
          </div>
          <div className="newsletter-checkbox">
            <label>
              <input type="checkbox" /> I am interested in receiving newsletters
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
