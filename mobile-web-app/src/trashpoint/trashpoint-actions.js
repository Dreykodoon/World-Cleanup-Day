import localforage from 'localforage';

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
