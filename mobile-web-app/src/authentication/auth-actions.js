export const SET_FB_LOGIN_STATUS = 'SET_FB_LOGIN_STATUS';

export function setFBLoginStatus() {
    return (dispatch) => {
        window.FB.getLoginStatus(function(response) {
            dispatch({
                type: SET_FB_LOGIN_STATUS,
                payload: response.status,
            });
        });
    };
}
