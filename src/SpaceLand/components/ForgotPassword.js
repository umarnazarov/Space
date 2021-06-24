import React, { useContext, useRef, useState } from 'react'
import {Link} from 'react-router-dom'
import "../css/ForgotPassword.css"
import { AuthContext } from '../context/AuthContext'


function ForgotPassword() {
    const { resetPassword } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const emailRef = useRef()
    async function handleResetPassword(e) {
        e.preventDefault()
        try {
            setError('')
            setMessage("")
            await resetPassword(emailRef.current.value)
            setMessage("Check inbox for further instructions")
        } catch(e) {
            setError(e.message)
        }
    }
    return (
        <div className='img-con'>
            <nav className="n-links">
                <Link className="n-link" to='/home'>Space</Link>
                <a className="n-link" href='/home#contact'>Contact</a>
                <a className="n-link" href='/home#about'>About</a>
            </nav>
            <div className="delete-content">
                <i className="fa fa-exclamation-circle "></i>
                <h2 className="container-password-text">Forgot Password</h2>
                <p className="delete-info" >Enter your email address associated with your account and we'll send you a link to reset your password.</p>
                <form onSubmit={handleResetPassword}>
                    <input ref={emailRef} className="delete-input" type="text" placeholder="Your email address" />
                    <h4 className="error-handle">{error && error}</h4>
                    <h4 className="error-success" >{message && message}</h4>
                    <button onClick={handleResetPassword} id="reset-btn">Recover</button>
                    <h4  className='pass-for-h'><Link to='/home' className='pass-for'><i class="fa fa-arrow-left" aria-hidden="true"></i>Go Back</Link></h4>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
