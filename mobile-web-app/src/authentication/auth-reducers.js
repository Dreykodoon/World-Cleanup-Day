import { SET_FB_LOGIN_STATUS } from './auth-actions';
import FB_USER_STATUS_ENUM from './fb-user-status-enum';

const initialState = {
    fbUserStatus: FB_USER_STATUS_ENUM.UNKNOWN,
};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case SET_FB_LOGIN_STATUS: {
            return Object.assign({}, state, {fbUserStatus: payload});
        }
        default: {
            return state;
        }
    }
}
