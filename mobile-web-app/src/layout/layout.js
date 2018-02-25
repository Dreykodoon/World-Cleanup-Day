import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import LoginScreen from './login-screen';
import MainScreen from './main-screen';
import { clearMessage } from '../globals/globals-actions';

const Layout = ({message, hideMessage}) => (
    <div style={{height: '100%'}}>
        <Switch>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/main' component={MainScreen}/>
            <Redirect to='/login'/>
        </Switch>
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={message !== null}
            onClose={hideMessage}
            message={<div>{message}<button onClick={hideMessage}>close</button></div>}
            autoHideDuration={5000}/>
    </div>
);

Layout.propTypes = {
    message: PropTypes.string,
    hideMessage: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        message: state.globals.message,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideMessage: () => dispatch(clearMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
