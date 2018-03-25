import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './header';
import Camera from '../trashpoint/camera';
import Gallery from '../trashpoint/gallery';
import { loadTrashpoints, unloadTrashpoints } from '../trashpoint/trashpoint-actions';

class MainScreen extends React.Component {
    componentWillMount() {
        this.props.loadTrashpoints();
    }

    componentWillUnmount() {
        this.props.unloadTrashpoints();
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
    loadTrashpoints: PropTypes.func,
    unloadTrashpoints: PropTypes.func,
    history: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTrashpoints: () => dispatch(loadTrashpoints()),
        unloadTrashpoints: () => dispatch(unloadTrashpoints()),
    };
};

export default connect(undefined, mapDispatchToProps)(MainScreen);
