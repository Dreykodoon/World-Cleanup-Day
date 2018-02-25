import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { facebookInitialized } from './globals-actions';

class FacebookSdkLoader extends React.Component {
    componentDidMount() {
        if (document.getElementById('facebook-jssdk')) {
            return;
        }
        this.setFbAsyncInit();
        this.loadFacebookSdkAsynchronously('script', 'facebook-jssdk');
    }

    setFbAsyncInit() {
        window.fbAsyncInit = () => {
            window.FB.init({
                appId      : '155260651860400',
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true, // parse social plugins on this page
                version    : 'v2.8' // use graph api version 2.8
            });
            this.props.facebookInitialized();
        };
    }

    loadFacebookSdkAsynchronously(elementTag, elementId) {
        const facebookElement = document.getElementsByTagName(elementTag)[0];
        if (document.getElementById(elementId)) {
            return;
        }
        const element = document.createElement(elementTag);
        element.id = elementId;
        element.src = 'https://connect.facebook.net/en_US/sdk.js';
        facebookElement.parentNode.insertBefore(element, facebookElement);
    }

    render() {
        return this.props.children;
    }
}

FacebookSdkLoader.propTypes = {
    children: PropTypes.any,
    facebookInitialized: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        facebookInitialized: () => dispatch(facebookInitialized())
    };
};

export default connect(undefined, mapDispatchToProps)(FacebookSdkLoader);
