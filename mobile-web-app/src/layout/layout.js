import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './login-screen';
import MainScreen from './main-screen';

const Layout = () => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/main' component={MainScreen}/>
            <Redirect to='/login'/>
        </Switch>
    </div>
);

export default Layout;
