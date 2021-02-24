import { FETCH_AMPL_BALANCE } from '../actions/blockchain';

const defaultState = {
  ampl_balance: "0"
};

export default function blockchainReducer(state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_AMPL_BALANCE:
      return Object.assign({}, state, {
        ampl_balance: action.payload
      });
    default:
      return state;
  }
}
