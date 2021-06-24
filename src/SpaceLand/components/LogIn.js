import React, { useRef, useState, useContext } from 'react'
import "../css/LoginSignUp.css";
import man from '../css/images/signinman.png'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import LoadingAnim from './LoadingAnim'


function LogIn() {
    const emailRef = useRef()
    const history = useHistory()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signin } = useContext(AuthContext)
    async function handleLogin(e) {
        e.preventDefault()
        if (!emailRef.current.value || !passwordRef.current.value) {
            return setError('Please fill inputs')
        }
        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            setTimeout(() => {
                history.push('/home/profile')
            },500)
        } catch (e) {
            setError(e.message)
        }
        setLoading(false)
    }
    return (
        <div className="signIn-container">
            <div className='img-part'>
                <div className="signIn-greeting">
                    <h1 className="greet-text">Wellcome Back!</h1>
                    <p className='greet-parg'>This is an opportunity for humans to explore all planets extremely fast and easy</p>
                    <img className="signIn-greet-man" alt='man' src={man} />
                    <ul className="signin-links">
                        <li className="link-ul"><NavLink exact className="active-link" to='/login'>Log In</NavLink></li>
                        <li className="link-ul"><NavLink exact className="non-active-link" to='/signup'>Sign up</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className='signIn-main'>
                <h1 className='signIn-main-text text-theme'>Sign In</h1>
                <form onSubmit={handleLogin} className='signIn-main-form'>
                    <label className='signIn-label text-theme'>Email Address:</label>
                    <input ref={emailRef} className='sign-In-input' />
                    <label className='signIn-label text-theme'>Password:</label>
                    <input ref={passwordRef} type='password' className='sign-In-input' />
                    <span id="auth-error">{error}</span>
                    <button disabled={loading} className='signIn-button text-background-theme'>{loading ? <LoadingAnim/> : "Submit"}</button>
                </form>
                <p className='auth-info'>Don't have an account yet? <Link id="sign-redirect" className='text-theme' to='/signup'>Sign Up</Link></p>
                <h4 className='go-back text-theme'><NavLink to='/home' className='go-back-nav'><i className="fa fa-arrow-left" aria-hidden="true"></i>Home Page</NavLink></h4>
            </div>
        </div>
    )
}

export default LogIn
