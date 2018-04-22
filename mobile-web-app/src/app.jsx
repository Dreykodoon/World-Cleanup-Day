import React from 'react';
import Layout from './layout/layout';
import FacebookSdkLoader from './globals/facebook-sdk-loader';

const App = () => (
    <FacebookSdkLoader>
        <Layout/>
    </FacebookSdkLoader>
);

export default(App);
