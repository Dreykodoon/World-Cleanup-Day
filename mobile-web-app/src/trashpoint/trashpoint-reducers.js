import {
    ADD_TRASHPOINT,
    LOAD_TRASHPOINTS,
    UNLOAD_TRASHPOINTS,
    DELETE_TRASHPOINTS,
    DELETE_SINGLE_TRASHPOINT,
} from './trashpoint-actions';

const initialState = {trashpoints: [], trashpointIdCounter: 0};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_TRASHPOINT: {
            const {trashpoints, trashpointIdCounter} = state;

            return Object.assign({}, state, {trashpoints: trashpoints.concat([payload]), trashpointIdCounter: trashpointIdCounter + 1});
        }
        case LOAD_TRASHPOINTS: {
            return Object.assign({}, state, {trashpoints: payload, trashpointIdCounter: calculateTrashpointIdCounterValue(payload)});
        }
        case UNLOAD_TRASHPOINTS: {
            return initialState;
        }
        case DELETE_TRASHPOINTS: {
            return Object.assign({}, initialState);
        }
        case DELETE_SINGLE_TRASHPOINT: {
            const remainingTrashpoints = state.trashpoints.filter((trashpoint) => trashpoint.id !== payload);

            return Object.assign({}, state, {trashpoints: remainingTrashpoints});
        }
        default: {
            return state;
        }
    }
}

function calculateTrashpointIdCounterValue(trashpoints) {
    if (trashpoints.length > 0) {
        const lastTrashpointId = trashpoints[trashpoints.length - 1].id;
        const idPrefixCounter = Number(lastTrashpointId.split('_')[0]);

        return idPrefixCounter + 1;
    }

    return 0;
}
