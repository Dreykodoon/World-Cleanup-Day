import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutWithFB } from '../authentication/auth-actions';
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
    logoutButton: {
        backgroundColor: 'blue',
        color: 'white',
        height: '30px',
    },
};

class Header extends Component {
    componentWillMount() {
        this.fbLogout = () => {
            this.props.logoutWithFB();
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.fbInitialized !== nextProps.fbInitialized && nextProps.fbInitialized) {
            this.fbLogout = () => {
                this.props.logoutWithFB();
            };
        }
        if (nextProps.loggedIn === false && nextProps.loggedIn !== this.props.loggedIn) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.leftMenu}>
                    <Link style={{display: 'inline-block'}} to='/main/camera'>Camera</Link>
                    <div style={{width: '15px', display: 'inline-block'}}></div>
                    <Link style={{display: 'inline-block'}} to='/main/gallery'>Gallery</Link>
                </div>
                <div style={styles.rightMenu}>
                    <button disabled={!this.props.fbInitialized} onClick={this.fbLogout} style={styles.logoutButton}>
                        Log out from Facebook
                    </button>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    fbInitialized: PropTypes.bool,
    logoutWithFB: PropTypes.func,
    loggedIn: PropTypes.bool,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
        loggedIn: state.auth.facebook.status === FB_USER_STATUS_ENUM.CONNECTED,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutWithFB: () => dispatch(logoutWithFB()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
