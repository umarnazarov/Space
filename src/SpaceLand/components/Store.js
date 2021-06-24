import React, { useContext, useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import littlestars from '../css/images/littlestars.png'
import Hamburger from "./Hamburger";
import '../css/Store.css'
import { HamburgerContext } from "../context/HamburgerContext";
import CardLoadingAnim from "../components/CardLoadingAnim";
import { AuthContext } from "../context/AuthContext";
import uuid from "uuid/dist/v4"
import { firestore } from "../firebase/configs";
import { storage } from "../firebase/configs";
import Footer from "./Footer";
import LoadingAnim from './LoadingAnim'



function Store() {
  const { toggler, handleToggler, setToggler } = useContext(HamburgerContext);
  const { CurrentUser } = useContext(AuthContext);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [addLoading, setaAddLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const ticketsData = await firestore.collection('data').get()
      setData(ticketsData.docs.map(doc => doc.data()))
      setLoading(false)
    }
    return fetchData()
  }, [])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const handleBuket = async (ticket) => {
    setaAddLoading(true)
    const rest = await firestore.collection('users').doc(CurrentUser.uid).get()
    const restBasket = rest.data().basket
    await firestore.collection('users').doc(CurrentUser.uid).update({ basket: [...restBasket, { ...ticket, id: uuid() }] })
    setaAddLoading(false)
  }

  const renderTicketCards = () => {
    return (
      <div className="tickets-content" key={uuid()}>
        {data && data.map(t => (
          <div className="theTicket" key={t.destination}>
            <div>
              <img alt={t.destination} className="ticket-image" src={t.image} />
            </div>
            <div className="ticket-info">
              <h2>Planet {t.destination}</h2>
              <h4>{t.population} Residents</h4>
              <h4>{formatter.format(t.price)}</h4>
              {CurrentUser ? <button className="st-btn" onClick={handleBuket.bind(this, t)} >Add to Card</button> :
                <Link className="st-btn" to='/login'>Add to Card</Link>}
            </div>
          </div>
        ))}
      </div>
    )
  }
    return (
      <>
        <div className="store-header">
          <div className="store-nav-bg">
            <nav className="store-nav">
              <div className="store-nav-container">
                <ul className="nav-left">
                  <Link className="store-nav-link link " to="/home">
                    Space
                  </Link>
                  <li className="store-nav-link links">
                    <a className="links" href="/home#about">About</a>
                  </li>
                  <li className="store-nav-link links">
                    <a className="links" href="/home#contact">Contact</a>
                  </li>
                  <li className="store-nav-link links">
                    <a className="links" href="/store">Tickets</a>
                  </li>
                </ul>
                <div className="nav-right links">
                  {CurrentUser ? <Link className="store-auth-link" to='/home/profile'>Profile Account</Link> : <><Link className="store-auth-link" to="/login">
                    Sign In
                  </Link>
                    <Link className="store-auth-link" to="/signup">
                      Create Account
                    </Link></>}
                </div>
                <i onClick={handleToggler} className="fa fa-bars"></i>
              </div>
            {addLoading && <LoadingAnim/>} <Hamburger toggler={toggler} setToggler={setToggler} />
            </nav>
          </div>
          <div className='store-header-container'>
            <div className='store-header-content'>
              <div className='store-header-video'>
                <video className='store-video-tag' controls src='https://firebasestorage.googleapis.com/v0/b/space-72d33.appspot.com/o/video%2FSPACE%20TRAVEL%20__%20Short%20Film%20(SONY%20A7S).mp4?alt=media&token=85a7aee8-c803-417a-b1fe-4ea2ada6331c' height='270px'>
                </video>
              </div>
              <div className='store-header-text'>
                <img id='stars' src={littlestars}/>
                <h1>DISCOUNTS ARE</h1>
                <h1 id='avail'>AVAILABLE</h1>
                <p>If You Buy Your Dream Ticket Today You Will Get 20% Off</p>
                <div className='store-icons'>
                  <a href='https://www.instagram.com/spacex'><i className="fab fa-instagram store-icon"></i></a>
                  <a href='https://www.facebook.com/search/top?q=space.com'><i className="fab fa-facebook-square store-icon"></i></a>
                  <a href='https://www.twitter.com/spacex'><i className="fab fa-twitter-square store-icon" ></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tickets" className="store-main-container">
          <div className="store-content">
            <h1 id="tickets-text">Available Tickets</h1>
            {data.length === 0 || loading ? <CardLoadingAnim/> : renderTicketCards()}
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Store
