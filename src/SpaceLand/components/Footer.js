import React from 'react'
import '../css/Footer.css'
import {Link} from 'react-router-dom'

function Footer({width}) {
    return (
        <footer className="footer">
            <div style={{ maxWidth: width}} className="footer-content">
                <a href='https://www.instagram.com/thisisnothim/' className="im"><i className="far fa-user"></i> Umar Nazarov</a>
                <div className="footer-icons">
                    <Link className="footer-icon" to='/home/profile'><i className="fab footer-fa fa-cc-stripe"></i></Link>
                    <Link className="footer-icon" to='/home/profile'><i className="fab footer-fa fa-cc-paypal"></i></Link>
                    <Link className="footer-icon" to='/home/profile'><i className="fab footer-fa fa-cc-visa"></i></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
