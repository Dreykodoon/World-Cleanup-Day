import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Camera from '../photo/camera';
import Gallery from '../photo/gallery';
import { loadPhotos, unloadPhotos } from '../photo/photo-actions';
import { isUserLoggedIn } from '../authentication/auth-reducers';

class MainScreen extends React.Component {
    componentWillMount() {
        if (this.props.loggedIn) {
            this.props.loadPhotos();
        }
        else {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loggedIn) {
            this.props.history.push('/login');
        }
    }

    componentWillUnmount() {
        this.props.unloadPhotos();
    }

    render() {
        const {match} = this.props;

        return this.props.loggedIn ? (
            <div style={{height: '100%'}}>
                <Header/>
                <Route path={`${match.url}/camera`} component={Camera}/>
                <Route path={`${match.url}/gallery`} component={Gallery}/>
            </div>
        ) : null;
    }
}

MainScreen.propTypes = {
    match: PropTypes.any,
    loadPhotos: PropTypes.func,
    unloadPhotos: PropTypes.func,
    loggedIn: PropTypes.bool,
    history: PropTypes.any,
};

const mapStateToProps = (state) => {
    return {
        loggedIn: isUserLoggedIn(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhotos: () => dispatch(loadPhotos()),
        unloadPhotos: () => dispatch(unloadPhotos()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
