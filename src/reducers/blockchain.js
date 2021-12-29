import { FETCH_STAKING_TOKEN_BALANCE } from "../actions/blockchain";
import { SET_VAULT_TYPE } from "../actions/blockchain";
import { FETCH_STAKED_BALANCE } from "../actions/blockchain";
import { FETCH_CLAIMABLE_AMPLESENSE_BALANCE } from "../actions/blockchain";
import { FETCH_KMPL_PRICE, FETCH_EEFI_PRICE, FETCH_AMPL_PRICE, FETCH_ETH_PRICE, FETCH_TVL_VALUE, FETCH_ZNFT_PRICE, FETCH_ANFT_PRICE } from "../actions/blockchain";
import { FETCH_REWARD } from "../actions/blockchain";
import { FETCH_ALLOWANCE } from "../actions/blockchain";
import { MAKE_DEPOSIT, MAKE_WITHDRAWAL, MAKE_CLAIM, FETCH_DEPOSITS, FETCH_WITHDRAWALS, FETCH_CLAIMINGS, FETCH_STAKABLE_NFTS, FETCH_VAULT_VALUE } from "../actions/blockchain";
import { FETCH_GAS_PRICE_FASTEST } from "../actions/blockchain";
import { FETCH_GAS_PRICE_FAST } from "../actions/blockchain";
import { FETCH_GAS_PRICE_AVERAGE } from "../actions/blockchain";
import { FETCH_TOTAL_STAKED } from "../actions/blockchain";

const defaultState = {
  vault_type: 0,
  staking_token_balance: "0",
  staking_token_withdraw: "0",
  reward: { token: "0", eth: "0" },
  claimable: "0",
  kmpl_price: "0",
  eefi_price: "0",
  gas_price_fastest: "0",
  gas_price_fast: "0",
  gas_price_average: "0",
  allowance: "0",
  total_staked: "0",
  deposits: [],
  withdrawals: [],
  claimings: [],
  vaultValues: {},
};

export default function blockchainReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_VAULT_TYPE:
      return Object.assign({}, state, {
        vault_type: action.payload,
      });
    case FETCH_STAKING_TOKEN_BALANCE:
      return Object.assign({}, state, {
        staking_token_balance: action.payload,
      });
    case FETCH_STAKED_BALANCE:
      return Object.assign({}, state, {
        staking_token_withdraw: action.payload,
      });
    case FETCH_CLAIMABLE_AMPLESENSE_BALANCE:
      return Object.assign({}, state, {
        claimable: action.payload,
      });
    case FETCH_KMPL_PRICE:
      return Object.assign({}, state, {
        kmpl_price: action.payload,
      });
    case FETCH_ZNFT_PRICE:
      return Object.assign({}, state, {
        znft_price: action.payload,
      });
    case FETCH_ANFT_PRICE:
      return Object.assign({}, state, {
        anft_price: action.payload,
      });
    case FETCH_EEFI_PRICE:
      return Object.assign({}, state, {
        eefi_price: action.payload,
      });
    case FETCH_ETH_PRICE:
      return Object.assign({}, state, {
        eth_price: action.payload,
      });
    case FETCH_AMPL_PRICE:
      return Object.assign({}, state, {
        ampl_price: action.payload,
      });
    case FETCH_TOTAL_STAKED:
      return Object.assign({}, state, {
        total_staked: action.payload,
      });
    case FETCH_GAS_PRICE_FASTEST:
      return Object.assign({}, state, {
        gas_price_fastest: action.payload,
      });
    case FETCH_GAS_PRICE_FAST:
      return Object.assign({}, state, {
        gas_price_fast: action.payload,
      });
    case FETCH_GAS_PRICE_AVERAGE:
      return Object.assign({}, state, {
        gas_price_average: action.payload,
      });
    case FETCH_VAULT_VALUE:
      let vaultValues = state.vaultValues;
      const vault = action.payload;
      vaultValues[vault.vaultType.name] = vault;
      return Object.assign({}, state, {
        vaultValues: vaultValues,
      });
    case FETCH_TVL_VALUE:
      return Object.assign({}, state, {
        history_tvl: action.payload,
      });
    case FETCH_REWARD:
      return Object.assign({}, state, {
        reward: action.payload,
      });
    case FETCH_ALLOWANCE:
      return Object.assign({}, state, {
        allowance: action.payload,
      });
    case MAKE_DEPOSIT:
      let new_deposits2 = [...state.deposits];
      let did_find = false;
      new_deposits2.map((deposit) => {
        if (deposit.id === action.payload.deposit_tx.id) {
          did_find = true;
          // updating existing entry
          if (action.payload.deposit_tx.mined) {
            deposit.mined = true;
          } else if (action.payload.deposit_tx.allowanceMined) {
            deposit.allowanceMined = true;
          }
          if (action.payload.deposit_tx.transactionHash) deposit.transactionHash = action.payload.deposit_tx.transactionHash;
          if (action.payload.deposit_tx.allowanceHash) deposit.allowanceHash = action.payload.deposit_tx.allowanceHash;
        }
        return console.log(deposit);
      });
      // in case action.payload.deposit_tx.returnValues is undefined
      // this means we are trying to update a transaction of another vault
      // than the current one, so just ignore
      if (!did_find && action.payload.deposit_tx.returnValues) {
        new_deposits2.push(action.payload.deposit_tx);
      }
      return Object.assign({}, state, {
        deposits: new_deposits2,
      });
    case MAKE_WITHDRAWAL:
      let new_withdrawals2 = state.withdrawals.slice();
      let did_find2 = false;
      new_withdrawals2.map((withdrawal) => {
        if (withdrawal.id === action.payload.withdrawal_tx.id) {
          did_find2 = true;
          // updating existing entry
          if (action.payload.withdrawal_tx.mined) {
            withdrawal.mined = true;
          }
          if (action.payload.withdrawal_tx.transactionHash) withdrawal.transactionHash = action.payload.withdrawal_tx.transactionHash;
        }
        return console.log(withdrawal);
      });
      if (!did_find2) {
        new_withdrawals2.push(action.payload.withdrawal_tx);
      }
      return Object.assign({}, state, {
        withdrawals: new_withdrawals2,
      });
      case MAKE_CLAIM:
        let new_claims = state.claimings.slice();
        did_find2 = false;
        new_claims.map((claim) => {
          console.log("claim", action.payload)
          if (claim.id === action.payload.claim_tx.id) {
            did_find2 = true;
            // updating existing entry
            if (action.payload.claim_tx.mined) {
              claim.mined = true;
            }
            if (action.payload.claim_tx.transactionHash) claim.transactionHash = action.payload.claim_tx.transactionHash;
          }
          return console.log(claim);
        });
        if (!did_find2) {
          new_claims.push(action.payload.claim_tx);
        }
        return Object.assign({}, state, {
          claimings: new_claims,
        });
    case FETCH_DEPOSITS:
      return Object.assign({}, state, {
        deposits: action.payload.events,
      });
    case FETCH_WITHDRAWALS:
      return Object.assign({}, state, {
        withdrawals: action.payload.events,
      });
    case FETCH_CLAIMINGS:
      return Object.assign({}, state, {
        claimings: action.payload.events,
      });
    case FETCH_STAKABLE_NFTS:
      return Object.assign({}, state, {
        stakableNFTs: action.payload.stakableNfts,
      });
    default:
      return state;
  }
}
