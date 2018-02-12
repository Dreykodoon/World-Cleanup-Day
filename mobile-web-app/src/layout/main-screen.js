import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Camera from '../photo/camera';
import Gallery from '../photo/gallery';
import { loadPhotos, unloadPhotos } from '../photo/photo-actions';

class MainScreen extends React.Component {
    componentWillMount() {
        this.props.loadPhotos();
    }

    componentWillUnmount() {
        this.props.unloadPhotos();
    }

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
    loadPhotos: PropTypes.func,
    unloadPhotos: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: () => dispatch(loadPhotos()),
        unloadPhotos: () => dispatch(unloadPhotos()),
    };
};

export default connect(undefined, mapDispatchToProps)(MainScreen);
