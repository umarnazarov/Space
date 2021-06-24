import React, {useContext, useRef, useState} from 'react'
import "../css/LoginSignUp.css";
import signupilus from '../css/images/signupilus.png'
import { NavLink, Link, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import LoadingAnim from '../components/LoadingAnim'

function SignUp() {
    const { signup } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordConfirmRef = useRef()
    const passwordRef = useRef()
    async function handleSubmit (e)  {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value)
            setTimeout(() => {
                history.push('/home/profile')
            },700)
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
      <div className="signIn-container">
        <div className="img-part">
          <div className="signIn-greeting">
            <h1 className="greet-text">Register Right Now</h1>
            <p className="greet-parg">
              Buy your dream ticket to your dream planet.{" "}
              <strong>Lets ROCK!!</strong>
            </p>
            <img className="signIn-greet-man" alt='space' src={signupilus} />
            <ul className="signin-links">
              <li className="link-ul">
                <NavLink exact className="non-active-link" to="/login">
                  Log In
                </NavLink>
              </li>
              <li className="link-ul">
                <NavLink exact className="active-link" to="/signup">
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="signIn-main">
          <h1 className="signIn-main-text">Sign Up</h1>
          <form onSubmit={handleSubmit} className="signIn-main-form">
            <label className="signIn-label">Name:</label>
            <input ref={nameRef} className="sign-In-input" />
            <label className="signIn-label">Email Address:</label>
            <input ref={emailRef} className="sign-In-input" />
            <label className="signIn-label">Password:</label>
            <input
              ref={passwordRef}
              type="password"
              className="sign-In-input"
            />
            <label className="signIn-label">Confirm Password:</label>
            <input
              ref={passwordConfirmRef}
              type="password"
              className="sign-In-input"
            />
            <span id="auth-error">{error}</span>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="signIn-button"
            >
              {loading ? <LoadingAnim/> : "Submit"}
            </button>
          </form>
          <p className="auth-info">
            Already have an account?{" "}
            <Link id="sign-redirect" to="/login">
              Sign In
            </Link>
          </p>
          <h4 className="go-back">
            <NavLink to="/home" className="go-back-nav">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>Home Page
            </NavLink>
          </h4>
        </div>
      </div>
    );
}

export default SignUp
