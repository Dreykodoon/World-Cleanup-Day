import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';

const Layout = ({children}) => (
    <div>
        <Header/>
        {children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
