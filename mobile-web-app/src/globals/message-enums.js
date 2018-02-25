export const MESSAGE_TYPES = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    SUCCESS: 'success',
};

export const MESSAGES = {
    TEST_MESSAGE: {
        text: 'Test message',
        type: MESSAGE_TYPES.SUCCESS,
    },
    FACEBOOK_LOGIN_FAILED: {
        text: 'Could not connect to Facebook. Please try again later.',
        type: MESSAGE_TYPES.ERROR,
    }
};
