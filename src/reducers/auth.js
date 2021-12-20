import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from "../actions/user";

export default function auth(
  state = {
    isFetching: false,
    isAuthenticated: false,
    web3: undefined,
    account: undefined,
  },
  action
) {
  //const that = this;
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        web3: action.payload.web3,
        account: action.payload.account,
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        web3: undefined,
        account: undefined,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload,
      });
    default:
      return state;
  }
}
