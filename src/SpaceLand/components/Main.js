import React, { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import mars from '../css/images/mars.gif'
import jupiter from '../css/images/jupiter.gif'
import neptune from '../css/images/neptune.gif'
import rocket from '../css/images/rocket.png'
import "../css/Main.css";
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from "../context/AuthContext";
import { firestore } from "../firebase/configs";
import data from './DefaultPropData'
import uuid from "uuid/dist/v4"
import LoadingAnim from './LoadingAnim'



function HomePage({ handleTheme, isDark }) {
    const { CurrentUser } = useContext(AuthContext);
    const [addLoading, setaAddLoading] = useState(false)

    const handleBuket = async (ticket) => {
        setaAddLoading(true)
        const rest = await firestore.collection('users').doc(CurrentUser.uid).get()
        const restBasket = rest.data().basket
        firestore.collection('users').doc(CurrentUser.uid).update({ basket: [...restBasket, { ...ticket, id: uuid() }] })
        setaAddLoading(false)
    }

    const renderDefaultData = () => {
        return data.map(t => (
            <div key={t.id} className='planet'>
                <img alt="person" className="planet-image" src={t.image} />
                <h3 className='planet-name'>{t.destination}</h3>
                <p><strong>Population:</strong> {t.population}</p>
                <p><strong>40%</strong> Discount in March</p>
                {CurrentUser ? <button className="buy-btn" onClick={handleBuket.bind(this, t)}><i className="fas fa-cart-plus"></i> Add to Card</button> :
                <div className='link-cont'><Link className="buy-btn" to='/login'><i className="fas fa-cart-plus"></i> Add to Card</Link></div>}
            </div>
        ))
    }
    return (
        <main>
            <Header handleTheme={handleTheme} isDark={isDark}/>
            <div className="content">
                <h1 id='st' className='text-theme'>OUR SERVICES</h1>
                <div className="services">
                    <div className="services-qs">
                        <div className="quesans">
                            <h3 className="ques text-theme">Why to change planet?</h3>
                            <p>Increasing consumption, a growing and more mobile human population, and climate change are transforming the planet’s surface, creating challenges that scientists and policy makers struggle to understand and address. Yet this era of change is also a time of geographical innovation.</p>
                            <p className="ques2">In recent years, a rapidly expanding interdisciplinary community of scientists has drawn on new geographical concepts, tools, and techniques to advance understanding of topics such as environmental change, sustainability, globalization, and population dynamics. As a result, geographical ideas and information have become increasingly central to science, as well as to planning, environmental management, and policy making</p>
                        </div>
                        <div className="quesans">
                            <h3 className="ques text-theme">Why ticket's price is so high?</h3>
                            <p>Ticket prices are high today for a number of reasons. For starters, the industry has consolidated a lot over the last few years. Less competition means less need for cheaper prices. Thanks to bankruptcies and mergers, there are now only a handful of major airlines in the United States</p>
                        </div>
                        <div className="service-btn-w">
                            <a className="service-btn" href='#request'>LEAVE REQUEST NOW!</a>
                        </div>
                    </div>
                    <div className="stages">
                        <div>
                            <ol className="stage">
                                <li className="stage-item"><h3 className="stage-title text-theme ">Buy Ticket</h3><p className="stage-text">Book a ticket in our website or from our company</p></li>
                                <li className="stage-item"><h3 className="stage-title text-theme">Check Your Health</h3><p className="stage-text">After you'll be tacken to health carying agency</p></li>
                                <li className="stage-item"><h3 className="stage-title text-theme">Get Ready Your Flight Bag</h3><p className="stage-text">Take anything you want and get ready</p></li>
                                <li className="stage-item"><h3 className="stage-title text-theme">Fly To New Planet</h3><p className="stage-text">Start your life from zero</p></li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="about_us" id='about'>
                    <img className="about-img" src={rocket} alt="Rocket" />
                    <div className='abouts'>
                        <h1 className="reason_choose text-theme">Why To Choose Us?</h1>
                        <div className="ab-container">
                            <div className="about">
                                <h3 className="about_num">6,283,985</h3>
                                <p className="about_info" >Successfull landings</p>
                                <p className="about_more" >More and more people are chosing new homeplanets and starting new lives, with our help</p>
                            </div>
                            <div className="about">
                                <h3 className="about_num">6</h3>
                                <p className="about_info" >Years since our first land</p>
                                <p className="about_more" >We have a huge experience in science and our rockets are fully safe, fast and modern</p>
                            </div>
                            <div className="about">
                                <h3 className="about_num">100%</h3>
                                <p className="about_info" >Quality of trust</p>
                                <p className="about_more" >We are all happy to make people's life a lot easier to move into different planets incredibly fast and safe</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {addLoading && <p className='adding-anim'>Adding <LoadingAnim border={'solid 2px #600481'} /></p>}
                <h1 id="slp" className='text-theme'>Safest Life Planets </h1>
                <div className="planets" >
                    {renderDefaultData()}
                </div>
                <div className="contact_form">
                    <div className='contacts' id="contact">
                        <h1 className="contact-main-title text-theme">Contacts</h1>
                        <div className="contact-address">
                            <h4 className='contact-title text-theme'>Address</h4>
                            <p className='contact-location'>USA, Broklyn</p>
                            <p className='contact-street'>Str. Kingdom 3</p>
                        </div>
                        <div className="contact-address">
                            <h4 className="contact-title text-theme">Work Time</h4>
                            <p className="contact-time" >Mon-Fri: from 9:00 to 19:00</p>
                            <p className="weekends " >Sat-Sun: Weekends</p>
                        </div>
                        <div className="contact-address">
                            <h4 className='contact-title text-theme' >Phone Number</h4>
                            <p className="number">+1 478 932 045</p>
                        </div>
                    </div>
                    <form className='form' id='request' action="https://formsubmit.co/1nazarovumar@gmail.com" method="POST">
                        <h1 className="form-main-title">Leave Request</h1>
                        <input type="hidden" name="_next" value="https://thespacestation.netlify.app/"></input>
                        <input type="hidden" name="_subject" value="Ticket Request"></input>
                        <input required name='email' className="form-inputs" type="text" placeholder="What's your email?"/>
                        <input required name='message' className="form-inputs " type="tel" pattern="[0-9]{2} [0-9]{3}-[0-9]{2}-[0-9]{2}" placeholder="Your phone number" />
                        <code>*Format: 99 999-99-99</code>
                        <button className='form-btn'>Send Request</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default HomePage
