import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    image: {
        width: '70%',
        margin: '10px',
        display: 'block',
    }
};

const Photo = ({ src }) => (
    <img style={styles.image} alt='trash' src={src}/>
);

Photo.propTypes = {
    src: PropTypes.string,
};

export default Photo;
