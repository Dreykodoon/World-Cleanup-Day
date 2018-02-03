import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    image: {
        width: '100px',
        height: '100px',
        marginLeft: '10px',
        marginRight: '10px',
    }
};

const Photo = ({ src }) => (
    <img style={styles.image} alt='trash' src={src}/>
);

Photo.propTypes = {
    src: PropTypes.string,
};

export default Photo;
