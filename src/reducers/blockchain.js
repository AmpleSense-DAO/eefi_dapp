import { FETCH_AMPL_BALANCE } from '../actions/blockchain';
import { FETCH_AMPL_AMPLESENSE_BALANCE } from '../actions/blockchain';
import { FETCH_KMPL_PRICE } from '../actions/blockchain';

const defaultState = {
  ampl_balance: "0",
  ampl_withdraw: "0",
  kmpl_price: "0"
};

export default function blockchainReducer(state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_AMPL_BALANCE:
      return Object.assign({}, state, {
        ampl_balance: action.payload
      });
    case FETCH_AMPL_AMPLESENSE_BALANCE:
      return Object.assign({}, state, {
        ampl_withdraw: action.payload
      });      
   case FETCH_KMPL_PRICE:
      return Object.assign({}, state, {
        kmpl_price: action.payload
      });      
    default:
      return state;
  }
}
