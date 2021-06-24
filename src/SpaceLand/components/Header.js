import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Hamburger from "./Hamburger";
import { Link, useHistory } from "react-router-dom";
import person from "../css/images/person.png";
import Modal from "react-modal";
import { HamburgerContext } from "../context/HamburgerContext";
import "../css/Header.css";
import LoadingAnim from "./LoadingAnim";

function Header({ handleTheme, isDark }) {
  const history = useHistory();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [SignUpError, setSignUpError] = useState("");
  const [SignInError, setSignInError] = useState("");
  const [loading, setLoading] = useState(false);
  const { CurrentUser, signup, signin } = useContext(AuthContext);
  const { toggler, handleToggler, setToggler } = useContext(HamburgerContext);
  async function handleSubmitSignUp(event) {
    event.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setSignUpError("Passwords do not match");
    }
    try {
      setSignUpError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value);
      history.push("/home/profile");
    } catch (e) {
      setSignUpError(e.message);
    }
    setLoading(false);
  }

  async function handleSubmitLogIn(event) {
    event.preventDefault();
    try {
      setSignInError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      setTimeout(() => {
        history.push("/home/profile");
      }, 500);
    } catch (e) {
      setSignInError(e.message);
    }
    setLoading(false);
  }

  const handleSignUp = () => setModal(!modal);
  const handleSignIn = () => setModal2(!modal2);
  Modal.setAppElement("#root");
  return (
    <header className="container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="nav-left">
            <a href="/home" className="nav nav-logo">
              Space
            </a>
            <a href="#about" className="nav navbar-link ontoggle">
              About
            </a>
            <a href="#contact" className="nav navbar-link ontoggle">
              Contact
            </a>
            <Link to="/store" className="nav navbar-link ontoggle">
              Tickets
            </Link>
          </div>
          <div>
            {CurrentUser ? (
              <Link
                to="/home/profile"
                className="nav navbar-auth ontoggle"
              >
                Profile Account
              </Link>
            ) : (
              <div>
                <span
                  onClick={handleSignIn}
                  className="nav navbar-auth ontoggle"
                >
                  Sign In
                </span>
                <span
                  onClick={handleSignUp}
                  className="nav navbar-auth ontoggle create-acc"
                >
                  Create Account
                </span>
              </div>
            )}
            <i onClick={handleToggler} className="fa fa-bars"></i>
          </div>
        </div>
        <Hamburger toggler={toggler} setToggler={setToggler} />
        <Modal
          isOpen={modal}
          onRequestClose={handleSignUp}
          closeTimeoutMS={240}
          afterOpen="afterOpen-modal"
          beforeClose="beforeClose-modal"
          className="log-modal"
          overlayClassName="over-modal"
        >
          <h4 className="modal-company">SPACE</h4>
          <button onClick={handleSignUp} className="modal-quit">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h2 className="modal-greet">Create Account</h2>
          <form onSubmit={handleSubmitSignUp}>
            <input
              required
              ref={nameRef}
              className="modal-input"
              type="text"
              placeholder="Your Name"
            />
            <input
              required
              ref={emailRef}
              className="modal-input"
              type="text"
              placeholder="Email address"
            />
            <input
              className="modal-input"
              ref={passwordRef}
              required
              placeholder="Create password"
              type="password"
            />
            <input
              className="modal-input"
              ref={passwordConfirmRef}
              required
              placeholder="Confirm password"
              type="password"
            />
            <h4 id="modal-error">{SignUpError && SignUpError}</h4>
            <h4 id="modal-error">{SignUpError && "Please try again"}</h4>
            <button disabled={loading} id="modal-btn">
              {loading ? <LoadingAnim /> : "Continue"}
            </button>
          </form>
        </Modal>
        <Modal
          isOpen={modal2}
          onRequestClose={handleSignIn}
          closeTimeoutMS={240}
          afterOpen="afterOpen-modal"
          beforeClose="beforeClose-modal"
          className="log-modal"
          overlayClassName="over-modal"
        >
          <h4 className="modal-company">SPACE</h4>
          <button onClick={handleSignIn} className="modal-quit">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <h2 className="modal-greet">Sign In</h2>
          <form onSubmit={handleSubmitLogIn}>
            <input
              required
              ref={emailRef}
              className="modal-input"
              type="text"
              placeholder="Your email address"
            />
            <input
              className="modal-input"
              ref={passwordRef}
              required
              placeholder="Your password"
              type="password"
            />
            <h4 id="modal-error">{SignInError && SignInError}</h4>
            <h4 id="modal-error">{SignInError && "Please try again"}</h4>
            <button disabled={loading} id="modal-btn">
              {loading ? <LoadingAnim /> : "Continue"}
            </button>
            <h4 className="pass-for">
              <Link to="/home/recover-profile">Fogot Password?</Link>
            </h4>
          </form>
        </Modal>
      </nav>
      <div className="text">
        <div className="text-main-content">
          <h2 id="main-text">HOUSE FROM SPACE</h2>
          <h4 className="text-title">
            BUY AN APARTMENT FROM SPACE FOR A REASONABLE PRICE
          </h4>
          <p className="text-info">
            "Change your living planet and start a new life from zero"
          </p>
          <Link id="nav-btn" to='/store'>
            Buy Now
          </Link>
          <div className="nav-icons">
            <a className="nav-icon nav-icon1" href="https://www.instagram.com/spacex">
              <i className="fa fa-instagram nav-fa "></i>
            </a>
            <a className="nav-icon nav-icon2" href="https://www.facebook.com/search/top?q=space.com">
              <i className="fa fa-facebook nav-fa"></i>
            </a>
            <a className="nav-icon nav-icon3" href="https://www.twitter.com/spacex">
              <i className="fa fa-twitter nav-fa"></i>
            </a>
            <button className="theme-face nav-icon4" onClick={handleTheme}>
              {isDark ? (
                <i className="fa fa-moon-o"></i>
              ) : (
                <i className="fa fa-sun-o"></i>
              )}
            </button>
          </div>
        </div>
        <img className="navbar-img-person" src={person} alt="space" />
      </div>
    </header>
  );
}

export default Header;
