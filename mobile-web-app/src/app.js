import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './layout/layout';
import Camera from './photo/camera';
import Gallery from './photo/gallery';
import FacebookSdkLoader from './authentication/facebook-sdk-loader';
import { loadPhotos } from './photo/photo-actions';


class App extends Component {
    componentWillMount() {
        this.props.loadPhotos();
    }

    render() {
        return (
            <FacebookSdkLoader>
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path='/camera' component={Camera}/>
                            <Route exact path='/gallery' component={Gallery}/>
                            <Redirect to='/camera'/>
                        </Switch>
                    </Layout>
                </Router>
            </FacebookSdkLoader>
        );
    }
}

App.propTypes = {
    loadPhotos: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: () => dispatch(loadPhotos()),
    };
};

export default connect(undefined, mapDispatchToProps)(App);
