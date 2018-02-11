import React from 'react';
import { Route } from 'react-router-dom';
import LoginScreen from './login-screen';
import MainScreen from './main-screen';

const Layout = () => (
    <div style={{height: '100%'}}>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/main' component={MainScreen}/>
    </div>
);

export default Layout;
