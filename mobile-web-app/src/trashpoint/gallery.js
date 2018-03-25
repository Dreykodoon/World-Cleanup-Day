import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Photo from './photo';
import { deletePhotos, deleteSinglePhoto } from './trashpoint-actions';

const styles = {
    photoContainer: {
        margin: '10px',
        display: 'block',
    }
};

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.deletePhotos = this.deletePhotos.bind(this);
        this.deleteSinglePhoto = this.deleteSinglePhoto.bind(this);
    }

    deletePhotos() {
        const {photos, removeAllPhotos} = this.props;
        removeAllPhotos(photos);
    }

    deleteSinglePhoto(photoId) {
        return () => {
            this.props.removeSinglePhoto(photoId);
        };
    }

    render() {
        const { photos } = this.props;

        return (
            <div>
                <div>
                    A series of trash photos.
                    <button onClick={this.deletePhotos}>Delete all photos</button>
                    {photos.map((photo, index) => (
                        <div style={styles.photoContainer} key={index}>
                            <Photo src={photo.src}/>
                            <button onClick={this.deleteSinglePhoto(photo.id)}>Delete photo</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Gallery.propTypes = {
    loadPhotos: PropTypes.func,
    removeAllPhotos: PropTypes.func,
    removeSinglePhoto: PropTypes.func,
    photos: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        photos: state.photo.photos,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeAllPhotos: (photos) => dispatch(deletePhotos(photos)),
        removeSinglePhoto: (photoId) => dispatch(deleteSinglePhoto(photoId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
