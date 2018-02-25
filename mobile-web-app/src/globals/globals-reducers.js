import {
    FB_INITIALIZED,
    DISPLAY_MESSAGE,
    CLEAR_MESSAGE,
} from './globals-actions';

const initialState = {
    message: null,
    fbInitialized: false,
};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case FB_INITIALIZED: {
            return Object.assign({}, state, {fbInitialized: true});
        }
        case DISPLAY_MESSAGE: {
            return Object.assign({}, state, {message: payload});
        }
        case CLEAR_MESSAGE: {
            return Object.assign({}, state, {message: null});
        }
        default: {
            return state;
        }
    }
}
