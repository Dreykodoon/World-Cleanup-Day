import axios from 'axios';
import { BACKEND_LOGIN_SOURCES } from './constants';

export const SET_FB_LOGIN_STATUS = 'SET_FB_LOGIN_STATUS';
export const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
export const LOGOUT_WITH_FACEBOOK = 'LOGOUT_WITH_FACEBOOK';

export function setFBLoginStatus() {
    return (dispatch) => {
        window.FB.getLoginStatus(function(response) {
            dispatch({
                type: SET_FB_LOGIN_STATUS,
                payload: createPayloadFrom(response),
            });
        });
    };
}

export function loginWithFB() {
    return (dispatch) => {
        window.FB.login(async (fbResponse) => {
            const fbAccessToken = fbResponse.authResponse.accessToken;
            let wcdResponse;
            try {
                wcdResponse = await axios.post('/auth/external', {
                    source: BACKEND_LOGIN_SOURCES.FACEBOOK,
                    token: fbAccessToken,
                });
            }
            catch (exception) {
                // TODO: handle server error and user locked responses!
                console.log(exception);
            }
            dispatch({
                type: LOGIN_WITH_FACEBOOK,
                payload: {
                    wcdToken: wcdResponse.data.token,
                    facebook: createPayloadFrom(fbResponse),
                }
            });
        });
    };
}

export function logoutWithFB() {
    return (dispatch) => {
        window.FB.logout((response) => {
            dispatch({
                type: LOGOUT_WITH_FACEBOOK,
                payload: createPayloadFrom(response),
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
