import {
    GET_USER_PROFILE,
} from './user-actions';

const initialState = {};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case GET_USER_PROFILE: {
            return payload;
        }
        default: {
            return state;
        }
    }
}
