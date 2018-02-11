import { SET_FB_LOGIN_STATUS } from './auth-actions';
import FB_STATUS_ENUM from './fbstatus-enum';

const initialState = {fbStatus: FB_STATUS_ENUM.UNKNOWN};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case SET_FB_LOGIN_STATUS: {
            return Object.assign({}, state, {fbStatus: payload});
        }
        default: {
            return state;
        }
    }
}
