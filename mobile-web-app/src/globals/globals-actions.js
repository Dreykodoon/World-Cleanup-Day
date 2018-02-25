export const FB_INITIALIZED = 'FB_INITIALIZED';
export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

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
