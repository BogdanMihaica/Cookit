import Footer from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";
import "./Register.css";

export function Register() {
  return (
    <div className="bg">
      <Navbar />
      <div className="register-container">
        <h2>Register</h2>
        <form>
          <div>
            <label>Username:</label>
            <input type="text" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" required />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" required />
          </div>
          <div>
            <label>Confirm Email:</label>
            <input type="email" required />
          </div>
          <div className="newsletter-checkbox">
            <label>
              <input type="checkbox" />I am interested in receiving newsletters
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
