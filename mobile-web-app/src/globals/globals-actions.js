import axios from 'axios';

export const FB_INITIALIZED = 'FB_INITIALIZED';
export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET';

export function facebookInitialized() {
    return {
        type: FB_INITIALIZED,
    };
}

export function displayMessage(message) {
    return {
        type: DISPLAY_MESSAGE,
        payload: message,
    };
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE,
    };
}

export function retrieveDataset() {
    return (dispatch) => {
        axios.get('/datasets')
            .then((response) => {
                dispatch({
                    type: RETRIEVE_DATASET,
                    payload: response.data[0],
                });
            })
            .catch((error) => {
                //TODO something needs to be done when dataset couldn't be retrieved
                console.log(error);
            });
    };
}
