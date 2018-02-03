import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Link style={{display: 'inline-block'}} to='/camera'>Camera</Link>
                <div style={{width: '15px', display: 'inline-block'}}></div>
                <Link style={{display: 'inline-block'}} to='/gallery'>Gallery</Link>
            </div>
        );
    }
}

export default Header;
