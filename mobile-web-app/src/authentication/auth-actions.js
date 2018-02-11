export const SET_FB_LOGIN_STATUS = 'SET_FB_LOGIN_STATUS';

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

function createPayloadFrom(response) {
    const {status} = response;
    const {accessToken, signedRequest, userID} = response.authResponse;

    return {
        accessToken,
        signedRequest,
        userID,
        status,
    };
}
