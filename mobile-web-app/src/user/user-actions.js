import axios from 'axios';
import { DISPLAY_MESSAGE } from '../globals/globals-actions';
import { MESSAGES } from '../globals/message-enums';

export const GET_USER_PROFILE = 'GET_USER_PROFILE';

export function acceptTerms() {
    return async (dispatch, getState) => {
        try {
            await axios.put('/me/accept-terms', {}, {
                headers: {
                    Authorization: `Bearer ${getState().auth.wcdToken}`,
                }
            });
            retrieveUserProfile(dispatch, getState);
        }
        catch (exception) {
            dispatch({
                type: DISPLAY_MESSAGE,
                payload: MESSAGES.WCD_SERVER_UNAVAILABLE,
            });
        }
    };
}

export function getUserProfile() {
    return retrieveUserProfile;
}

async function retrieveUserProfile(dispatch, getState) {
    try {
        const response = await axios.get('/me', {
            headers: {
                Authorization: `Bearer ${getState().auth.wcdToken}`,
            }
        });

        dispatch({
            type: GET_USER_PROFILE,
            payload: response.data,
        });
    }
    catch (exception) {
        dispatch({
            type: DISPLAY_MESSAGE,
            payload: MESSAGES.WCD_SERVER_UNAVAILABLE,
        });
    }
}
