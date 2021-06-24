import React, { createContext, useState, useEffect} from 'react'
import { auth } from '../firebase/configs'
import firebase from "../firebase/configs";


export const AuthContext = createContext()
function AuthProvider(props) {
    const [CurrentUser, setCurrentUser] = useState()
    
    async function signup(email, password, name) {
        const img = 'https://firebasestorage.googleapis.com/v0/b/space-72d33.appspot.com/o/PngItem_1503945.png?alt=media&token=e51e7974-6f5f-47ae-a6a5-d38db5670c24'
        const cred = await auth.createUserWithEmailAndPassword(email, password)
        const db = firebase.firestore()
        return db.collection('users').doc(cred.user.uid).set({
            id: cred.user.uid,
            name: name,
            image: img,
            email: email,
            password: password,
            basket: []
        })
    }
    
    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    
    
    function logout() {
        auth.signOut()
    }
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user))
        return unsubscribe
    }, [])

    const value = {
        CurrentUser,
        signup,
        signin,
        logout,
        setCurrentUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider