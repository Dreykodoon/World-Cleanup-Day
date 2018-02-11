import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from './header';
import Camera from '../photo/camera';
import Gallery from '../photo/gallery';

class MainScreen extends React.Component {
    render() {
        const {match} = this.props;

        return (
            <div style={{height: '100%'}}>
                <Header/>
                <Route path={`${match.url}/camera`} component={Camera}/>
                <Route path={`${match.url}/gallery`} component={Gallery}/>
            </div>
        );
    }
}

MainScreen.propTypes = {
    match: PropTypes.any,
};

export default MainScreen;
