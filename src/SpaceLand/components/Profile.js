import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import '../css/Profile.css'
import { storage } from "../firebase/configs";
import firebase from "../firebase/configs";
import { firestore } from '../firebase/configs'
import uuid from "uuid/dist/v4"
import LoadingAnim from './LoadingAnim'



function Profile() {
    const { logout, CurrentUser } = useContext(AuthContext)
    const [userData, setUserData] = useState({ image: '', name: '', basket: [] })
    const nameRef = useRef()
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(false)
    const [imgLoad, setImgLoad] = useState(false)
    const [deleteLoad, setDeleteLoad] = useState(false)
    const [nameUpadate, setNameUpadate] = useState(false)
    const history = useHistory()
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const db = firebase.firestore()
            const user = await db.collection('users').doc(CurrentUser.uid).get()
            setUserData(user.data())
            setLoading(false)
        }
        return fetchData()
    }, [])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    function handleLogOut() {
        try {
            setTimeout(() => {
                logout()
                history.push('/')
            },700)
        } catch (e) {
            alert(e.message)
        }
    }
    const handleFileImage = async (input) => {
        if (input.target.files[0]) {
            setImgLoad(true)
            console.log(input.target.files[0])
            const imgId = uuid()
            const uploadImage = storage.ref(`userImages/${input.target.files[0].name + imgId}`).put(input.target.files[0]);
            uploadImage.on(
                'state_changed',
                snapshot => { },
                err => {
                    console.log(err)
                },
                () => {
                    storage
                        .ref('userImages')
                        .child(input.target.files[0].name + imgId)
                        .getDownloadURL()
                        .then(url => {
                            setUserData({ ...userData, image: url })
                            return url
                        })
                        .then(url => {
                            return firestore.collection('users').doc(CurrentUser.uid).update({ image: url })
                        }).then(
                            setImgLoad(false)
                        )
                }
            )
        }
    }

    const handleDeleteOrder = async (t) => {
        setDeleteLoad(true)
        const basketTickets = await firestore.collection('users').doc(CurrentUser.uid).get()
        const data = basketTickets.data().basket
        const newlyData = data.filter(tic => tic.id !== t.id)
        await firestore.collection('users').doc(CurrentUser.uid).update({ basket: newlyData })
        const updatedData = (await firestore.collection('users').doc(CurrentUser.uid).get()).data()
        setUserData(updatedData)
        setDeleteLoad(false)
    }

    const renderBsket = () => {
        if (userData.basket.length === 0) {
            return <><h3 className='inf-text'>Currently your basket is empty.</h3>
                <Link className='inf-link' to='/store'>Add ticket</Link></>
        }
        const data = userData.basket.map(t => (
            <div className="theTicket-basket" key={uuid()}>
                <i onClick={() => handleDeleteOrder(t)} className="fa fa-times-circle"></i>
                <div>
                    <img alt={t.destination} className="ticket-image-basket" src={t.image} />
                </div>
                <div className="ticket-info-basket">
                    <h2>Planet {t.destination}</h2>
                    <h4>{t.population} Residents</h4>
                    <h4>{formatter.format(t.price)}<span className="ticket-price-basket"></span></h4>
                </div>
            </div>
        ))
        return data
    }

    const handleChangeName = async (e) => {
        e.preventDefault()
        try {
            setNameUpadate(true)
            await firestore.collection('users').doc(CurrentUser.uid).update({ name: nameRef.current.value })
            const updatedUser =  (await firestore.collection('users').doc(CurrentUser.uid).get()).data()
            setInput(false)
            setUserData(updatedUser)
        } catch (e) {
            console.log(e)
        }
        setNameUpadate(false)
    }

    return (
        <div className='user-content'>
            <nav className='user-nav'>
                <Link className='user-nav-link' to='/home'>Home</Link>
                <a className='user-nav-link' href='/home#about'>About</a>
                <Link className='user-nav-link' to='/store'>Tickets</Link>
            </nav>
            <div className="user-interface">
                <div className='user-card'>
                    <h1>Profile Account</h1>
                    <code>of {CurrentUser.email}</code>
                    {loading ?
                        <LoadingAnim width={"50px"} height={"50px"} border={"3px solid #42044C"} /> :
                        < >{imgLoad ? <LoadingAnim width={"100px"} height={"100px"} border={"3px solid #42044C"} /> : <img alt='img' className='user-image' src={userData.image} />}
                            {input ?
                                <form className='change-form' onSubmit={handleChangeName}>
                                    <input required ref={nameRef} className='user-b' type='text' />{ nameUpadate && <LoadingAnim border={'1px solid #42044B'} position={'absolute'} top={'-11px'} right={'-30px'} />}
                                    <div className='btn-con'>
                                        <button onClick={() => setInput(false)} className='change-btn'>Cancel</button>
                                        <button className='change-btn'>Change</button>
                                    </div>
                                </form> :
                                <h2 className="user-n">{userData.name} <i onClick={() => setInput(true)}  className="fas fa-pen"></i></h2>}
                        <i className="fa fa-folder-open"></i>
                        <label className="user-upd" >
                            <input onChange={handleFileImage} type='file' data-original-title="upload photos" /><i className="fa fa-cloud-upload" ></i> Upload Image
                        </label>
                        <div>
                            <a href='#basket' ><i className="fas fa-shopping-bag" /> Basket</a>
                            <button className="user-out" onClick={handleLogOut}><i className="fa fa-sign-out"></i>Log Out</button>
                        </div>
                        </>}
                </div>
            </div>
            <div className="user-basket" id='basket'>
                <div className='user-basket-main'>
                    <h1 >Shopping Basket <i className="fas fa-shopping-bag"></i></h1>
                    <h2 id="total-price">Total Price: {formatter.format(Math.floor(userData.basket ? userData.basket.reduce((tot, next) => (tot + next.price), 0) : 0))}</h2>
                    <h2 id="total-price">{userData.basket.length} Tickets Were Selected</h2>
                    <div className="payment-icons">
                        <div>
                            <Link className="payment-icon"><i className="fab fa-cc-stripe"></i></Link>
                            <Link className="payment-icon"><i className="fab fa-cc-paypal"></i></Link>
                            <Link className="payment-icon"><i className="fab fa-cc-visa"></i></Link>
                        </div>
                    </div>
                    {deleteLoad && <><span id='delete-progress'>Deleting<LoadingAnim border={'red 1px solid'} /></span></>}
                    {loading ?
                        <LoadingAnim width={"50px"} height={"50px"} border={"3px solid white"}  /> :
                        renderBsket()
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile
