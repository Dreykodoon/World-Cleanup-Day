import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Photo from './photo';
import { deletePhotos } from './photo-actions';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.deletePhotos = this.deletePhotos.bind(this);
    }

    deletePhotos() {
        const {photos, removeAllPhotos} = this.props;
        removeAllPhotos(photos);
    }

    render() {
        const { photos } = this.props;
        return (
            <div>
                <div>
                    A series of trash photos.
                    {photos.map((photo, index) => <Photo key={index} src={photo.src}/>)}
                </div>
                <button onClick={this.deletePhotos}>Delete all photos</button>
            </div>
        );
    }
}

Gallery.propTypes = {
    loadPhotos: PropTypes.func,
    removeAllPhotos: PropTypes.func,
    photos: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        photos: state.photos,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAllPhotos: (photos) => dispatch(deletePhotos(photos)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
