import { FB_INITIALIZED } from './globals-actions';

const initialState = {
    fbInitialized: false,
};

export function reducers(state = initialState, {type}) {
    switch (type) {
        case FB_INITIALIZED: {
            return Object.assign({}, state, {fbInitialized: true});
        }
        default: {
            return state;
        }
    }
}
