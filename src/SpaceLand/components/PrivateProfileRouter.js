import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { Route, Redirect} from 'react-router-dom'

function PrivateProfileRouter({component: Component, ...rest}) {
    const { CurrentUser } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => { return CurrentUser ? <Component {...props} /> : <Redirect to='/login' /> }}>
            
        </Route>
    )
}

export default PrivateProfileRouter
