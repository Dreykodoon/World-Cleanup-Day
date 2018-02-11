import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFBLoginStatus, loginWithFB, logoutWithFB } from '../authentication/auth-actions';
import FB_USER_STATUS_ENUM from '../authentication/fb-user-status-enum';

const styles = {
    header: {
        height: '50px',
        overflow: 'auto',
    },
    leftMenu: {
        float: 'left',
    },
    rightMenu: {
        float: 'right',
    },
    facebookButton: {
        backgroundColor: 'blue',
        color: 'white',
        height: '30px',
    },
};

class Header extends Component {
    componentWillReceiveProps(nextProps) {
        if (this.fbInitialized !== nextProps.fbInitialized && nextProps.fbInitialized) {
            this.openFacebookPopup = () => {
                this.props.loginWithFB();
            };
            this.fbLogout = () => {
                this.props.logoutWithFB();
            };
        }
    }

    render() {
        const fbButtonOnClick = this.props.loggedIn ? this.fbLogout : this.openFacebookPopup;
        const fbButtonLabel = this.props.loggedIn ? 'Log out from Facebook' : 'Log in with Facebook';

        const fbButton = (
            <button onClick={fbButtonOnClick} style={styles.facebookButton}>
                {fbButtonLabel}
            </button>
        );

        return (
            <div style={styles.header}>
                <div style={styles.leftMenu}>
                    <Link style={{display: 'inline-block'}} to='/camera'>Camera</Link>
                    <div style={{width: '15px', display: 'inline-block'}}></div>
                    <Link style={{display: 'inline-block'}} to='/gallery'>Gallery</Link>
                </div>
                <div style={styles.rightMenu}>
                    {this.props.fbInitialized ? fbButton : null}
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    fbInitialized: PropTypes.bool,
    setFBLoginStatus: PropTypes.func,
    loggedIn: PropTypes.bool,
    loginWithFB: PropTypes.func,
    logoutWithFB: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
        loggedIn: state.auth.facebook.status === FB_USER_STATUS_ENUM.CONNECTED,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFBLoginStatus: (response) => dispatch(setFBLoginStatus(response)),
        loginWithFB: () => dispatch(loginWithFB()),
        logoutWithFB: () => dispatch(logoutWithFB()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
