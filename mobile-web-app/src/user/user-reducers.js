import { ACCEPT_TERMS } from './user-actions';

const initialState = {
    termsAccepted: false,
};

export function reducers(state = initialState, {type}) {
    switch (type) {
        case ACCEPT_TERMS: {
            return Object.assign({}, state, {termsAccepted: true});
        }
        default: {
            return state;
        }
    }
}
