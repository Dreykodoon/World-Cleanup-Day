import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    render() {
        return (
            <div style={styles.header}>
                <div style={styles.leftMenu}>
                    <Link style={{display: 'inline-block'}} to='/camera'>Camera</Link>
                    <div style={{width: '15px', display: 'inline-block'}}></div>
                    <Link style={{display: 'inline-block'}} to='/gallery'>Gallery</Link>
                </div>
                <div style={styles.rightMenu}>
                    <button disabled={!this.props.fbInitialized} style={styles.facebookButton}>Log in with Facebook</button>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    fbInitialized: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        fbInitialized: state.globals.fbInitialized,
    };
};

export default connect(mapStateToProps)(Header);
