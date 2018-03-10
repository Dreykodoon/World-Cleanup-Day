import axios from 'axios';

export const ACCEPT_TERMS = 'ACCEPT_TERMS';

export function acceptTerms() {
    return async (dispatch, getState) => {
        try {
            await axios.put('/me/accept-terms', {}, {
                headers: {
                    Authorization: `Bearer ${getState().auth.wcdToken}`,
                }
            });
            dispatch({
                type: ACCEPT_TERMS,
            });
        }
        catch (exception) {
            //TODO what to do in case server unresponsive
            console.log(exception);
        }
    };
}
