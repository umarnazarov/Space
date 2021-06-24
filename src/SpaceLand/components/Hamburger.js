import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../css/Hamburger.css'

function Hamburger({toggler, setToggler}) {
  const handleTogglerClose = () => setToggler(!toggler);
  const { CurrentUser } = useContext(AuthContext);

  return (
    <div id={toggler ? "mobile-nav" : ""} className="mobile-nav">
      <i onClick={handleTogglerClose} className="fa fa-times"></i>
      <div className="mobile-nav-content">
        <a
          onClick={handleTogglerClose}
          className="mobile-nav-link text-theme"
          href="#about"
        >
          About
        </a>
        <a
          onClick={handleTogglerClose}
          className="mobile-nav-link text-theme"
          href="#contact"
        >
          Contact
        </a>
        <Link
          onClick={handleTogglerClose}
          className="mobile-nav-link text-theme"
          to="/store"
        >
          Tickets
        </Link>
        {CurrentUser ? (
          <Link onClick={handleTogglerClose} to='/home/profile' className="mobile-nav-link">Account Profile</Link>
        ) : (
          <div className="mobile-auth-content">
            <Link
              onClick={handleTogglerClose}
                className="mobile-nav-link text-theme"
              to="/login"
            >
              Sign In
            </Link>
            <Link
              onClick={handleTogglerClose}
                className="mobile-nav-link text-theme"
              to="signup"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hamburger
