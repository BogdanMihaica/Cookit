import { Link } from "react-router-dom";
import "./Popup.css";

export const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form>
          <div>
            <label>Email:</label>
            <input type="email" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="links">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          {/* Use Link instead of a */}
          <Link to="/register" className="sign-up">
            Don't have an account?
          </Link>
        </div>
      </div>
    </div>
  );
};
