import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFBLoginStatus } from '../authentication/auth-actions';

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
                window.FB.login((response) => {
                    this.props.setFBLoginStatus(response);
                });
            };
        }
    }

    render() {
        const fbLoginButton = (
            <button onClick={this.openFacebookPopup} style={styles.facebookButton}>Log in with Facebook</button>
        );

        return (
            <div style={styles.header}>
                <div style={styles.leftMenu}>
                    <Link style={{display: 'inline-block'}} to='/camera'>Camera</Link>
                    <div style={{width: '15px', display: 'inline-block'}}></div>
                    <Link style={{display: 'inline-block'}} to='/gallery'>Gallery</Link>
                </div>
                <div style={styles.rightMenu}>
                    {this.props.fbInitialized ? fbLoginButton : null}
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    fbInitialized: PropTypes.bool,
    setFBLoginStatus: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setFBLoginStatus: (response) => dispatch(setFBLoginStatus(response)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
