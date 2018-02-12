import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './layout/layout';
import FacebookSdkLoader from './authentication/facebook-sdk-loader';

const App = () => (
    <FacebookSdkLoader>
        <Router>
            <Layout/>
        </Router>
    </FacebookSdkLoader>
);

export default(App);
