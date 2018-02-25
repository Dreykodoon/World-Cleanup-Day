import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loginWithFB } from '../authentication/auth-actions';
import { isUserLoggedIn } from '../authentication/auth-reducers';
import { displayMessage } from '../globals/globals-actions';

const styles = {
    screen: {
        height: '100%',
    },
    facebookButton: {
        backgroundColor: 'blue',
        color: 'white',
        height: '30px',
    },
};

class LoginScreen extends React.Component {
    constructor() {
        super();

        this.openFacebookPopup = () => this.props.loginWithFB();
        this.displayMessage = () => this.props.displayMessage();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn && nextProps.loggedIn !== this.props.loggedIn) {
            this.props.history.push('/main/camera');
        }
    }

    render() {
        return (
            <div style={styles.screen}>
                <button disabled={!this.props.fbInitialized} onClick={this.openFacebookPopup} style={styles.facebookButton}>
                    Log in with Facebook
                </button>
                <button onClick={this.displayMessage}>Display snackbar</button>
            </div>
        );
    }
}

LoginScreen.propTypes = {
    fbInitialized: PropTypes.bool,
    loggedIn: PropTypes.bool,
    loginWithFB: PropTypes.func,
    history: PropTypes.any,
    displayMessage: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
        loggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithFB: () => dispatch(loginWithFB()),
        displayMessage: () => dispatch(displayMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginScreen));
