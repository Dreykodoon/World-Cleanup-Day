import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { addPhoto } from './photo-actions';

const styles = {
    topContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        height: '500px',
    },
    webcamContainer: {
        position: 'absolute',
        left: '50%',
    },
    webcam: {
        position: 'relative',
        left: '-50%',
    },
    button: {
        position: 'relative',
        top: '80%',
        left: '50%',
        width: '100px',
        marginLeft: '-50px'
    },
};

class Camera extends Component {
    constructor(props) {
        super(props);
        this.setRef = (webcam) => this.setState({ webcam });
    }

    takePhoto() {
        const { webcam } = this.state;
        this.props.addPhoto(webcam.getScreenshot());
    }

    setRef(webcam) {
        this.setState({ webcam });
    }

    render() {
        return (
            <div style={styles.topContainer}>
                <div style={styles.webcamContainer}>
                    <Webcam style={styles.webcam} audio={false} ref={this.setRef}/>
                </div>
                <button style={styles.button} onClick={this.takePhoto.bind(this)}>Click me</button>
            </div>
        );
    }
}

Camera.propTypes = {
    addPhoto: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPhoto: (photo) => dispatch(addPhoto(photo)),
    };
};

export default connect(null, mapDispatchToProps)(Camera);
