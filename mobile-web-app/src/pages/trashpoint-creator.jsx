import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { uploadTrashpoint } from '../trashpoint/trashpoint-actions';
import { STATUS } from '../trashpoint/trashpoint-enums';

class TrashpointCreator extends React.Component {
    constructor() {
        super();

        this.state = {
            status: STATUS.REGULAR,
        };
    }

    createTrashpoint() {
        this.props.uploadTrashpoint(this.props.location.state.trashpoint);
    }

    returnToDraftsPage() {
        this.props.history.push('/main/drafts');
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { trashpoint } = this.props.location.state;

        return (
            <form>
                <div>
                    Location: {trashpoint.coordinates.latitude}, {trashpoint.coordinates.longitude}
                </div>
                <FormControl style={{ width: '100px' }}>
                    <InputLabel htmlFor='status'>Threat level</InputLabel>
                    <Select
                        value={this.state.status}
                        onChange={this.handleChange.bind(this)}
                        inputProps={{
                            name: 'status',
                            id: 'status',
                        }}
                    >
                        <MenuItem value={STATUS.REGULAR}>Regular</MenuItem>
                        <MenuItem value={STATUS.THREAT}>Threat</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <button onClick={this.createTrashpoint.bind(this)}>Create trashpoint</button>
                    <button onClick={this.returnToDraftsPage.bind(this)}>Cancel</button>
                </div>
            </form>
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
