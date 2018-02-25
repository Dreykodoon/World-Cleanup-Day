import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import { clearMessage } from './globals-actions';
import { MESSAGE_TYPES } from './message-enums';

const styles = {
    [MESSAGE_TYPES.INFO]: {
        color: 'blue',
    },
    [MESSAGE_TYPES.WARNING]: {
        color: 'yellow',
    },
    [MESSAGE_TYPES.ERROR]: {
        color: 'red',
    },
    [MESSAGE_TYPES.SUCCESS]: {
        color: 'green',
    },
};

const MessageContainer = ({message, hideMessage}) => {
    const messageType = message ? message.type : '';
    const messageText = message ? message.text : '';

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={message !== null}
            onClose={hideMessage}
            message={<div>
                <span style={styles[messageType]}>{messageText}</span>
                <Button onClick={hideMessage}>
                    <CloseIcon/>
                </Button>
            </div>}
            autoHideDuration={5000}/>
    );
};

MessageContainer.propTypes = {
    message: PropTypes.object,
    hideMessage: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        message: state.globals.message,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideMessage: () => dispatch(clearMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
