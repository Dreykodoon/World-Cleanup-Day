import localforage from 'localforage';
import axios from 'axios';
import { STATUS, AMOUNT, COMPOSITION } from './trashpoint-enums';

export const ADD_TRASHPOINT = 'ADD_TRASHPOINT';
export const LOAD_TRASHPOINTS = 'LOAD_TRASHPOINTS';
export const UNLOAD_TRASHPOINTS = 'UNLOAD_TRASHPOINTS';
export const DELETE_TRASHPOINTS = 'DELETE_TRASHPOINTS';
export const DELETE_SINGLE_TRASHPOINT = 'DELETE_SINGLE_TRASHPOINT';

export function addTrashpoint({coordinates, screenshot}) {
    return (dispatch, getState) => {
        const userID = getState().auth.facebook.userID;
        const idCounter = getState().trashpoint.trashpointIdCounter;
        const trashpoint = {
            id: `${idCounter}_${userID}`,
            coordinates,
            src: screenshot,
            userID,
        };
        localforage.setItem(trashpoint.id, trashpoint)
            .then(() => dispatch({
                type: ADD_TRASHPOINT,
                payload: trashpoint,
            }))
            .catch((err) => {
                // TODO: something needs to be done if adding a trashpoint was unsuccesfull.
                console.log(err);
            });
    };
}

export function loadTrashpoints() {
    return (dispatch, getState) => {
        let trashpoints = [];
        const currentUserID = getState().auth.facebook.userID;

        localforage.iterate((trashpoint) => {
            if (currentUserID === trashpoint.userID) {
                trashpoints.push(trashpoint);
            }
        })
            .then(() => dispatch({
                type: LOAD_TRASHPOINTS,
                payload: trashpoints,
            }))
            .catch((err) => {
                // TODO: something needs to be done if loading trashpoints was unsuccesfull.
                console.log(err);
            });
    };
}

export function deleteTrashpoints(trashpoints) {
    return (dispatch) => {
        const trashpointIds = trashpoints.map((trashpoint) => trashpoint.id);
        Promise.all(trashpointIds.map((trashpointId) => localforage.removeItem(trashpointId)))
            .then(() => dispatch({
                type: DELETE_TRASHPOINTS,
            }))
            .catch((err) => {
                // TODO: something needs to be done if removal of all trashpoints was unsuccesfull.
                console.log(err);
            });
    };
}

export function deleteSingleTrashpoint(trashpointId) {
    return (dispatch) => {
        localforage.removeItem(trashpointId)
            .then(() => dispatch({
                type: DELETE_SINGLE_TRASHPOINT,
                payload: trashpointId,
            }))
            .catch((err) => {
                // TODO: something needs to be done if trying to remove the trashpoint fails.
                console.log(err);
            });
    };
}

export function unloadTrashpoints() {
    return {
        type: UNLOAD_TRASHPOINTS,
    };
}

export function uploadTrashpoint(trashpoint) {
    // TODO this is just a test run. It won't stay like this
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(
                '/trashpoints',
                {
                    datasetId: getState().globals.dataset.id,
                    location: trashpoint.coordinates,
                    status: STATUS.REGULAR,
                    amount: AMOUNT.HANDFUL,
                    composition: [COMPOSITION.PLASTIC],
                    name: 'test',
                    address: 'test',
                },
                {
                    headers: {
                        Authorization: `Bearer ${getState().auth.wcdToken}`,
                    }
                },
            );
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
    };
}
