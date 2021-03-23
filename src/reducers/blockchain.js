import { FETCH_AMPL_BALANCE } from '../actions/blockchain';
import { FETCH_AMPL_AMPLESENSE_BALANCE } from '../actions/blockchain';
import { FETCH_KMPL_PRICE } from '../actions/blockchain';
import { FETCH_AV_ETH_REWARD } from '../actions/blockchain';
import { FETCH_AV_TOKEN_REWARD } from '../actions/blockchain';
import { FETCH_AV_ALLOWANCE } from '../actions/blockchain';
import { MAKE_AV_DEPOSIT } from '../actions/blockchain';
import { MAKE_AV_WITHDRAWAL } from '../actions/blockchain';
import { FETCH_GAS_PRICE_FASTEST } from '../actions/blockchain';
import { FETCH_GAS_PRICE_FAST } from '../actions/blockchain';
import { FETCH_GAS_PRICE_AVERAGE } from '../actions/blockchain';
import { FETCH_AV_DEPOSITS } from '../actions/blockchain';
import { FETCH_AV_WITHDRAWALS } from '../actions/blockchain';

import { FETCH_KMPL_BALANCE } from '../actions/blockchain';
import { FETCH_KMPL_AMPLESENSE_BALANCE } from '../actions/blockchain';
import { FETCH_KV_ETH_REWARD } from '../actions/blockchain';
import { FETCH_KV_TOKEN_REWARD } from '../actions/blockchain';
import { FETCH_KV_DEPOSITS } from '../actions/blockchain';
import { FETCH_KV_WITHDRAWALS } from '../actions/blockchain';
import { FETCH_KV_ALLOWANCE } from '../actions/blockchain';

const defaultState = {
  ampl_balance: "0",
  ampl_withdraw: "0",
  kmpl_price: "0",
  gas_price_fastet: "0",
  gas_price_fast: "0",
  gas_price_average: "0",
  av_allowance: "0",
  deposit_tx: undefined,
  approval_tx: undefined,
  AVdeposits: [],
  AVwithdrawals: [],

  KVdeposits: [],
  KVwithdrawals: [],
  kmpl_balance: "0",
  kmpl_withdraw: "0",
  kv_allowance: "0",

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
    case FETCH_AV_ALLOWANCE:
      return Object.assign({}, state, {
        av_allowance: action.payload
      });  
    case MAKE_AV_DEPOSIT:
      // let new_deposits2 = state.deposits;
      // debugger;
      // new_deposits2.push(action.payload);
      // return Object.assign({}, state, {
      //   deposits: new_deposits2
      // });
      return state;
    case MAKE_AV_WITHDRAWAL:
      return Object.assign({}, state, {
        withdrawal_tx: action.payload
      });
    case FETCH_AV_DEPOSITS:
      let new_deposits = state.AVdeposits;
      new_deposits.push(action.payload);
      return Object.assign({}, state, {
        AVdeposits: new_deposits
      });
    case FETCH_AV_WITHDRAWALS:
      let new_withdrawals = state.AVwithdrawals;
      new_withdrawals.push(action.payload);
      return Object.assign({}, state, {
        AVwithdrawals: new_withdrawals
      });
    case FETCH_KMPL_BALANCE:
      return Object.assign({}, state, {
        kmpl_balance: action.payload
      });
    case FETCH_KMPL_AMPLESENSE_BALANCE:
      return Object.assign({}, state, {
        kmpl_withdraw: action.payload
      });      
  case FETCH_KV_ETH_REWARD:
      return Object.assign({}, state, {
        kmpl_eth_reward: action.payload
      });   
   case FETCH_KV_TOKEN_REWARD:
      return Object.assign({}, state, {
        kmpl_token_reward: action.payload
      });           
   case FETCH_KV_DEPOSITS:
      let new_kv_deposits = state.KVdeposits;
      new_kv_deposits.push(action.payload);
      return Object.assign({}, state, {
        KVdeposits: new_kv_deposits
      });
    case FETCH_KV_WITHDRAWALS:
      let new_kv_withdrawals = state.KVwithdrawals;
      new_kv_withdrawals.push(action.payload);
      return Object.assign({}, state, {
        KVwithdrawals: new_kv_withdrawals
      });     
  case FETCH_KV_ALLOWANCE:
      return Object.assign({}, state, {
        kv_allowance: action.payload
      });             
    default:
      return state;
  }
}
