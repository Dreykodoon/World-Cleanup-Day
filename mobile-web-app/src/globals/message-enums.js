export const MESSAGE_TYPES = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
};

export const MESSAGES = {
    FACEBOOK_LOGIN_FAILED: {
        text: 'Din not connect with Facebook.',
        type: MESSAGE_TYPES.ERROR,
    },
    WCD_LOGIN_FAILED: {
        text: 'Could not connect to WCD servers.',
        type: MESSAGE_TYPES.ERROR,
    }
};
