export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";

function requestLogin(payload) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

export function receiveProvider() {
  return (dispatch) => {
    dispatch(receiveLogin());
  };
}

export function loginUser(web3, account) {
  return (dispatch) => {
    dispatch(requestLogin({ web3, account }));
    // dispatch(receiveLogin());
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    // dispatch(receiveLogin());
  };
}