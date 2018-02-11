import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './layout/layout';
import Camera from './photo/camera';
import Gallery from './photo/gallery';
import { loadPhotos } from './photo/photo-actions';
import { setFBLoginStatus } from './authentication/auth-actions';
import { facebookInitialized } from './globals/globals-actions';


class App extends Component {
    componentWillMount() {
        this.props.loadPhotos();
    }

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
            this.props.setFBLoginStatus();
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
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/camera' component={Camera}/>
                        <Route exact path='/gallery' component={Gallery}/>
                        <Redirect to='/camera'/>
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

App.propTypes = {
    loadPhotos: PropTypes.func,
    setFBLoginStatus: PropTypes.func,
    facebookInitialized: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: () => dispatch(loadPhotos()),
        setFBLoginStatus: () => dispatch(setFBLoginStatus()),
        facebookInitialized: () => dispatch(facebookInitialized())
    };
};

export default connect(undefined, mapDispatchToProps)(App);
