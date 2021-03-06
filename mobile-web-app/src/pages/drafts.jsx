import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Screenshot from '../trashpoint/screenshot';
import { deleteTrashpoints, deleteSingleTrashpoint } from '../trashpoint/trashpoint-actions';

const styles = {
    screenshotContainer: {
        margin: '10px',
        display: 'block',
    }
};

class Drafts extends Component {
    deleteTrashpoints() {
        this.props.deleteTrashpoints(this.props.trashpoints);
    }

    deleteSingleTrashpoint(trashpointId) {
        return () => {
            this.props.deleteSingleTrashpoint(trashpointId);
        };
    }

    createTrashpoint(trashpointId) {
        const trashpoint = this.props.trashpoints.filter((tp) => tp.id === trashpointId)[0];

        return () => {
            this.props.history.push('/main/trashpoint', { trashpoint });
        };
    }

    render() {
        const { trashpoints } = this.props;

        return (
            <div>
                <div>
                    A series of trashpoint drafts.
                    <button onClick={this.deleteTrashpoints.bind(this)}>Delete all drafts</button>
                    {trashpoints.map((trashpoint, index) => (
                        <div style={styles.screenshotContainer} key={index}>
                            <Screenshot src={trashpoint.src}/>
                            <button onClick={this.deleteSingleTrashpoint(trashpoint.id)}>Delete draft</button>
                            <button onClick={this.createTrashpoint(trashpoint.id)}>Create trashpoint</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Drafts.propTypes = {
    deleteTrashpoints: PropTypes.func,
    deleteSingleTrashpoint: PropTypes.func,
    trashpoints: PropTypes.array,
    history: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        trashpoints: state.trashpoint.trashpoints,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTrashpoints: (trashpoints) => dispatch(deleteTrashpoints(trashpoints)),
        deleteSingleTrashpoint: (trashpointId) => dispatch(deleteSingleTrashpoint(trashpointId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Drafts);
