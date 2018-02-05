import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './layout/layout';
import Camera from './photo/camera';
import Gallery from './photo/gallery';
import Map from './photo/map';
import { loadPhotos } from './photo/photo-actions';

class App extends Component {
    componentWillMount() {
        this.props.loadPhotos();
    }

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/camera' component={Camera}/>
                        <Route exact path='/gallery' component={Gallery}/>
                        <Route exact path='/map' component={Map}/>
                        <Redirect to='/camera'/>
                    </Switch>
                </Layout>
            </Router>
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
