import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const styles = {
    header: {
        height: '50px',
    }
}

class Header extends Component {
    render() {
        return (
            <div style={styles.header}>
                <Link style={{display: 'inline-block'}} to='/camera'>Camera</Link>
                <div style={{width: '15px', display: 'inline-block'}}></div>
                <Link style={{display: 'inline-block'}} to='/gallery'>Gallery</Link>
                <div style={{width: '15px', display: 'inline-block'}}></div>
                <Link style={{display: 'inline-block'}} to='/map'>Map</Link>
            </div>
        );
    }
}

export default Header;
