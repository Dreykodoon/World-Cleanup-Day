import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { addPhoto } from './photo-actions';

const styles = {
    topContainer: {
        width: '100%',
        height: 'calc(100% - 50px)',
        overflowY: 'hidden',
    },
    button: {
        position: 'absolute',
        top: '80%',
        left: '50%',
        width: '100px',
        height: '50px',
        marginLeft: '-50px'
    },
};

class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                height: -1,
                width: -1,
            }
        };
        this.setCameraRef = (webcam) => this.setState({webcam});
        this.setContainerRef = (container) => {
            this.container = container;
        };
    }

    componentDidMount() {
        const {offsetWidth, offsetHeight} = this.container;
        this.setState({dimensions: {
            width: offsetWidth,
            height: offsetHeight,
        }});
    }

    takePhoto() {
        const { webcam } = this.state;
        this.props.addPhoto(webcam.getScreenshot());
    }

    render() {
        const {width, height} = this.state.dimensions;
        const cameraLeftMargin = 0 - ((height - width) / 2);

        return (
            <div ref={this.setContainerRef} style={styles.topContainer}>
                <Webcam style={{marginLeft: cameraLeftMargin}} height={height} width={height} audio={false} ref={this.setCameraRef}/>
                <button style={styles.button} onClick={this.takePhoto.bind(this)}>Take photo</button>
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
