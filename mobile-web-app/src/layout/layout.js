import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './login-screen';
import AcceptTermsScreen from './accept-terms-screen';
import MainScreen from './main-screen';
import MessageContainer from '../globals/message-container';

const Layout = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/terms' component={AcceptTermsScreen}/>
            <Route path='/main' component={MainScreen}/>
            <Redirect to='/login'/>
        </Switch>
        <MessageContainer/>
    </div>
);

export default Layout;
