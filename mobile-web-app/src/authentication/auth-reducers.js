import {
    SET_FB_LOGIN_STATUS,
    LOGIN_WITH_FACEBOOK,
    LOGOUT_WITH_FACEBOOK,
} from './auth-actions';
import FB_USER_STATUS_ENUM from './fb-user-status-enum';

const initialState = {
    facebook: {
        status: FB_USER_STATUS_ENUM.UNKNOWN,
        accessToken: null,
        signedRequest: null,
        userID: null,
    }
};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case SET_FB_LOGIN_STATUS: {
            return Object.assign({}, state, {facebook: payload});
        }
        case LOGIN_WITH_FACEBOOK: {
            return Object.assign({}, state, {facebook: payload});
        }
        case LOGOUT_WITH_FACEBOOK: {
            return Object.assign({}, state, {facebook: payload});
        }
        default: {
            return state;
        }
    }
}
