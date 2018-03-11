import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loginWithFB } from '../authentication/auth-actions';
import { isUserLoggedIn } from '../authentication/auth-reducers';
import { getUserProfile } from '../user/user-actions';

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
    }

    componentWillReceiveProps(nextProps) {
        const userJustLoggedIn = nextProps.loggedIn && nextProps.loggedIn !== this.props.loggedIn;
        const userAlreadyLoggedIn = this.props.loggedIn && nextProps.loggedIn === this.props.loggedIn;

        if (userJustLoggedIn) {
            this.props.getUserProfile();
        }
        else if (userAlreadyLoggedIn && !nextProps.userProfile.termsAcceptedAt) {
            this.props.history.push('/terms');
        }
        else if (userAlreadyLoggedIn && nextProps.userProfile.termsAcceptedAt) {
            this.props.history.push('/main/camera');
        }
    }

    render() {
        return (
            <div style={styles.screen}>
                <button disabled={!this.props.fbInitialized} onClick={this.openFacebookPopup} style={styles.facebookButton}>
                    Log in with Facebook
                </button>
            </div>
        );
    }
}

LoginScreen.propTypes = {
    fbInitialized: PropTypes.bool,
    loggedIn: PropTypes.bool,
    loginWithFB: PropTypes.func,
    getUserProfile: PropTypes.func,
    userProfile: PropTypes.object,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
        userProfile: state.user,
        loggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithFB: () => dispatch(loginWithFB()),
        getUserProfile: () => dispatch(getUserProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginScreen));
