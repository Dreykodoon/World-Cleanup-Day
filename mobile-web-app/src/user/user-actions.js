import axios from 'axios';

export const ACCEPT_TERMS = 'ACCEPT_TERMS';

export function acceptTerms() {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put('/me/accept-terms', {}, {
                headers: {
                    Authorization: `Bearer ${getState().auth.wcdToken}`,
                }
            });

            console.log(response);
        }
        catch (exception) {
            //TODO what to do in case server unresponsive
            console.log(exception);
        }
    };
}
