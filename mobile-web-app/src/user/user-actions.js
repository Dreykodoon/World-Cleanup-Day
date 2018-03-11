import axios from 'axios';

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
            //TODO what to do in case server unresponsive
            console.log(exception);
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
        //TODO what happens when cannot retrieve user profile
        console.log(exception);
    }
}
