import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadTrashpoint } from '../trashpoint/trashpoint-actions';

class TrashpointCreator extends React.Component {
    createTrashpoint() {
        this.props.uploadTrashpoint(this.props.location.state.trashpoint);
    }

    returnToDraftsPage() {
        this.props.history.push('/main/drafts');
    }

    render() {
        return (
            <div>
                <button onClick={this.createTrashpoint.bind(this)}>Create trashpoint</button>
                <button onClick={this.returnToDraftsPage.bind(this)}>Cancel</button>
            </div>
        );
    }
}

TrashpointCreator.propTypes = {
    uploadTrashpoint: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
    return {
        uploadTrashpoint: (trashpoint) => dispatch(uploadTrashpoint(trashpoint))
    };
};

export default connect(undefined, mapDispatchToProps)(TrashpointCreator);
