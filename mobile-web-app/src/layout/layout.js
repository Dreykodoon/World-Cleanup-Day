import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';

const styles = {
    layout: {
        height: '100%',
    }
};

const Layout = ({children}) => (
    <div style={styles.layout}>
        <Header/>
        {children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.any,
};

export default Layout;
