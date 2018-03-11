import axios from 'axios';
import { BACKEND_LOGIN_SOURCES } from './constants';
import { DISPLAY_MESSAGE } from '../globals/globals-actions';
import { MESSAGES } from '../globals/message-enums';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function loginWithFB() {
    return (dispatch) => {
        window.FB.login(async (fbResponse) => {
            if (fbResponse.authResponse === null) {
                dispatch({
                    type: DISPLAY_MESSAGE,
                    payload: MESSAGES.FACEBOOK_LOGIN_FAILED,
                });

                return;
            }

            try {
                const wcdResponse = await axios.post('/auth/external', {
                    source: BACKEND_LOGIN_SOURCES.FACEBOOK,
                    token: fbResponse.authResponse.accessToken,
                });
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        wcdToken: wcdResponse.data.token,
                        facebook: createPayloadFrom(fbResponse),
                    }
                });
            }
            catch (exception) {
                if (exception.response.data[0].code === 'AUTH_ACCOUNT_IS_LOCKED') {
                    dispatch({
                        type: DISPLAY_MESSAGE,
                        payload: MESSAGES.WCD_ACCOUNT_LOCKED,
                    });
                }
                else {
                    dispatch({
                        type: DISPLAY_MESSAGE,
                        payload: MESSAGES.WCD_SERVER_UNAVAILABLE,
                    });
                }
            }

        });
    };
}

export function logoutWithFB() {
    return (dispatch, getState) => {
        window.FB.logout(() => {
            axios.delete('/auth', {
                headers: {
                    Authorization: `Bearer ${getState().auth.wcdToken}`,
                }
            });
            dispatch({
                type: LOGOUT,
            });
        });
    };
}

function createPayloadFrom(response) {
    let {status, authResponse} = response;
    authResponse = authResponse ? authResponse : {
        accessToken: null,
        signedRequest: null,
        userID: null,
    };

    return {status, ...authResponse};
}
