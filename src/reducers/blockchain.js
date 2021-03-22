import { FETCH_AMPL_BALANCE } from '../actions/blockchain';
import { FETCH_AMPL_AMPLESENSE_BALANCE } from '../actions/blockchain';
import { FETCH_KMPL_PRICE } from '../actions/blockchain';
import { FETCH_AV_ETH_REWARD } from '../actions/blockchain';
import { FETCH_AV_TOKEN_REWARD } from '../actions/blockchain';
import { FETCH_ALLOWANCE } from '../actions/blockchain';
import { MAKE_DEPOSIT } from '../actions/blockchain';
import { MAKE_WITHDRAWAL } from '../actions/blockchain';
import { FETCH_GAS_PRICE_FASTEST } from '../actions/blockchain';
import { FETCH_GAS_PRICE_FAST } from '../actions/blockchain';
import { FETCH_GAS_PRICE_AVERAGE } from '../actions/blockchain';
import { FETCH_DEPOSITS } from '../actions/blockchain';
import { FETCH_WITHDRAWALS } from '../actions/blockchain';

const defaultState = {
  ampl_balance: "0",
  ampl_withdraw: "0",
  kmpl_price: "0",
  gas_price_fastet: "0",
  gas_price_fast: "0",
  gas_price_average: "0",
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
  case FETCH_GAS_PRICE_FASTEST:
      return Object.assign({}, state, {
        gas_price_fastest: action.payload
      });     
  case FETCH_GAS_PRICE_FAST:
      return Object.assign({}, state, {
        gas_price_fast: action.payload
      });
  case FETCH_GAS_PRICE_AVERAGE:
      return Object.assign({}, state, {
        gas_price_average: action.payload
      });         
   case FETCH_AV_ETH_REWARD:
      return Object.assign({}, state, {
        ampl_eth_reward: action.payload
      });   
   case FETCH_AV_TOKEN_REWARD:
      return Object.assign({}, state, {
        ampl_token_reward: action.payload
      });               
    case FETCH_ALLOWANCE:
      return Object.assign({}, state, {
        allowance: action.payload
      });  
    case MAKE_DEPOSIT:
      let new_deposits2 = state.deposits;
      let did_find = false;
      new_deposits2.map(deposit => {
        if(deposit.id == action.payload.deposit_tx.id) {
          did_find = true;
          // updating existing entry
          if(action.payload.deposit_tx.mined) {
            deposit.mined = true;
          } else if(action.payload.deposit_tx.allowanceMined) {
            deposit.allowanceMined = true;
          }
          if(action.payload.deposit_tx.transactionHash)
            deposit.transactionHash = action.payload.deposit_tx.transactionHash;
          if(action.payload.deposit_tx.allowanceHash)
            deposit.allowanceHash = action.payload.deposit_tx.allowanceHash;
        }
      })
      if(!did_find) {
        new_deposits2.push(action.payload.deposit_tx);
      }
      return Object.assign({}, state, {
        deposits: new_deposits2
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
