import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginScreen from './login-screen';
import AcceptTermsScreen from './accept-terms-screen';
import MainScreen from './main-screen';
import MessageContainer from '../globals/message-container';
import { isUserLoggedIn } from '../authentication/auth-reducers';

const Layout = ({ loggedIn }) => (
    <div style={{height: '100%'}}>
        <Router>
            <Switch>
                <Route path='/login' component={LoginScreen}/>
                <Route path='/terms' render={(props) => loggedIn ? React.cloneElement(<AcceptTermsScreen/>, props) : <Redirect to='/login'/>}/>
                <Route path='/main' render={(props) => loggedIn ? React.cloneElement(<MainScreen/>, props) : <Redirect to='/login'/>}/>
                <Redirect to='/login'/>
            </Switch>
        </Router>
        <MessageContainer/>
    </div>
);

Layout.propTypes = {
    loggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        loggedIn: isUserLoggedIn(state),
    };
};

export default connect(mapStateToProps)(Layout);
