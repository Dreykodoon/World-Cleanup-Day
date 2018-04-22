import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../layout/header';
import Camera from './camera';
import Drafts from './drafts';
import TrashpointCreator from './trashpoint-creator';
import { loadTrashpoints, unloadTrashpoints } from '../trashpoint/trashpoint-actions';
import { retrieveDataset } from '../globals/globals-actions';

class Main extends React.Component {
    componentWillMount() {
        this.props.loadTrashpoints();
        this.props.retrieveDataset();
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
                <Route path={`${match.url}/drafts`} component={Drafts}/>
                <Route path={`${match.url}/trashpoint`} component={TrashpointCreator}/>
            </div>
        );
    }
}

Main.propTypes = {
    match: PropTypes.any,
    loadTrashpoints: PropTypes.func,
    unloadTrashpoints: PropTypes.func,
    retrieveDataset: PropTypes.func,
    history: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTrashpoints: () => dispatch(loadTrashpoints()),
        unloadTrashpoints: () => dispatch(unloadTrashpoints()),
        retrieveDataset: () => dispatch(retrieveDataset()),
    };
};

export default connect(undefined, mapDispatchToProps)(Main);
