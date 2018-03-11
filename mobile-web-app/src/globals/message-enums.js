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
    WCD_SERVER_UNAVAILABLE: {
        text: 'Could not connect to WCD servers.',
        type: MESSAGE_TYPES.ERROR,
    },
    WCD_ACCOUNT_LOCKED: {
        text: 'Account has been locked.',
        type: MESSAGE_TYPES.WARNING,
    }
};
