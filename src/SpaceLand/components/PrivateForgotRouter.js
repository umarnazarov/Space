import React, {useContext} from 'react'
import { Route, Redirect} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


function CheckForgotRouter({component:Component, ...rest}) {
    const { CurrentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => { return CurrentUser ? <Redirect to='/home/profile' /> : <Component {...props}/> }}></Route>
    )
}

export default CheckForgotRouter
