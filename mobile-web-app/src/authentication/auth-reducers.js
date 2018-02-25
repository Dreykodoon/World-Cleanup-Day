import { createSelector } from 'reselect';
import {
    LOGIN_SUCCESS,
    LOGOUT,
} from './auth-actions';
import FB_USER_STATUS_ENUM from './fb-user-status-enum';

const initialState = {
    wcdToken: null,
    facebook: {
        status: FB_USER_STATUS_ENUM.UNKNOWN,
        accessToken: null,
        signedRequest: null,
        userID: null,
    }
};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case LOGIN_SUCCESS: {
            return payload;
        }
        case LOGOUT: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

/** SELECTORS */

const getFacebookUserStatus = (state) => state.auth.facebook.status;
const getWcdToken = (state) => state.auth.wcdToken;

export const isUserLoggedIn = createSelector([getFacebookUserStatus, getWcdToken],
    (facebookUserStatus, wcdToken) => facebookUserStatus === FB_USER_STATUS_ENUM.CONNECTED && Boolean(wcdToken));
