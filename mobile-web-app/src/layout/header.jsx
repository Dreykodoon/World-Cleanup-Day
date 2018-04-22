import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutWithFB } from '../authentication/auth-actions';

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
    constructor() {
        super();

        this.fbLogout = () => {
            this.props.logoutWithFB();
        };
    }

    render() {
        return (
            <div style={styles.header}>
                <div style={styles.leftMenu}>
                    <Link style={{display: 'inline-block'}} to='/main/camera'>Camera</Link>
                    <div style={{width: '15px', display: 'inline-block'}}></div>
                    <Link style={{display: 'inline-block'}} to='/main/drafts'>Drafts</Link>
                </div>
                <div style={styles.rightMenu}>
                    <button onClick={this.fbLogout} style={styles.logoutButton}>
                        Log out from Facebook
                    </button>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    logoutWithFB: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutWithFB: () => dispatch(logoutWithFB()),
    };
};

export default connect(undefined, mapDispatchToProps)(withRouter(Header));
