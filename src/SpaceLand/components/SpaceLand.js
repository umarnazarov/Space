import React, { useState } from "react";
import {Route, Switch, Redirect} from 'react-router-dom'
import Main from './Main'
import Store from './Store'
import AuthProvider from '../context/AuthContext'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/Theme';
import { GlobalStyles } from '../Theme/Global';
import PrivateForgotRouter from './PrivateForgotRouter'
import PrivateLoginRouter from './PrivateLoginRouter'
import PrivateSignupRouter from './PrivateSignupRouter'
import HamburgerProvider from '../context/HamburgerContext'
import PrivateProfileRouter from './PrivateProfileRouter'
import Profile from './Profile'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'
import LogIn from './LogIn'



function SpaceLand() {
    const [isDark, setDark] = useState(false)
    const handleTheme = () => setDark(!isDark)
    return (
      <ThemeProvider theme={!isDark ? lightTheme : darkTheme}>
        <AuthProvider>
          <GlobalStyles />
          <HamburgerProvider>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route
                exact
                path="/home"
                render={() => (
                  <Main handleTheme={handleTheme} isDark={isDark} />
                  )}
              />
              <Route exact path="/store" render={() => <Store />} />
              <PrivateProfileRouter exact path='/home/profile' component={Profile}/>
              <PrivateLoginRouter exact path='/login' component={LogIn}/>
              <PrivateSignupRouter exact path='/signup' component={SignUp}/>
              <PrivateForgotRouter exact path='/home/recover-profile' component={ForgotPassword} />
              <Redirect to="/home" />
            </Switch>
          </HamburgerProvider>
        </AuthProvider>
      </ThemeProvider>
    );
}

export default SpaceLand
