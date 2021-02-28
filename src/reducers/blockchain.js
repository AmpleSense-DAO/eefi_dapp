import { FETCH_AMPL_BALANCE } from '../actions/blockchain';
import { FETCH_AMPL_AMPLESENSE_BALANCE } from '../actions/blockchain';
import { FETCH_KMPL_PRICE } from '../actions/blockchain';
import { FETCH_ALLOWANCE } from '../actions/blockchain';
import { MAKE_APPROVAL } from '../actions/blockchain';
import { MAKE_DEPOSIT } from '../actions/blockchain';
import { MAKE_WITHDRAWAL } from '../actions/blockchain';
import { FETCH_DEPOSITS } from '../actions/blockchain';
import { FETCH_WITHDRAWALS } from '../actions/blockchain';

const defaultState = {
  ampl_balance: "0",
  ampl_withdraw: "0",
  kmpl_price: "0",
  allowance: "0",
  deposit_tx: undefined,
  approval_tx: undefined,
  deposits: [],
  withdrawals: []
};

export default function blockchainReducer(state = defaultState, action) {
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
    case FETCH_ALLOWANCE:
      return Object.assign({}, state, {
        allowance: action.payload
      });  
    case MAKE_APPROVAL:
      return Object.assign({}, state, {
        approval_tx: action.payload
      });
    case MAKE_DEPOSIT:
      return Object.assign({}, state, {
        deposit_tx: action.payload
      });
    case MAKE_WITHDRAWAL:
      return Object.assign({}, state, {
        withdrawal_tx: action.payload
      });
    case FETCH_DEPOSITS:
      let new_deposits = state.deposits;
      new_deposits.push(action.payload);
      return Object.assign({}, state, {
        deposits: new_deposits
      });
    case FETCH_WITHDRAWALS:
      let new_withdrawals = state.withdrawals;
      new_withdrawals.push(action.payload);
      return Object.assign({}, state, {
        withdrawals: new_withdrawals
      });
    default:
      return state;
  }
}
