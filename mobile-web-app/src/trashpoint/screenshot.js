import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    image: {
        width: '70%',
    }
};

const Screenshot = ({ src }) => (
    <img style={styles.image} alt='trash' src={src}/>
);

Screenshot.propTypes = {
    src: PropTypes.string,
};

export default Screenshot;
