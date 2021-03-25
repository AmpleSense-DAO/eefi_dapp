export const SET_VAULT_TYPE = 'SET_VAULT_TYPE';
export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_REWARD = 'FETCH_REWARD';
export const FETCH_ALLOWANCE = 'FETCH_ALLOWANCE';
export const MAKE_DEPOSIT = 'MAKE_DEPOSIT';
export const MAKE_WITHDRAWAL = 'MAKE_WITHDRAWAL';
export const FETCH_GAS_PRICE_FASTEST = 'FETCH_GAS_PRICE_FASTEST';
export const FETCH_GAS_PRICE_FAST = 'FETCH_GAS_PRICE_FAST';
export const FETCH_GAS_PRICE_AVERAGE = 'FETCH_GAS_PRICE_AVERAGE';
export const FETCH_DEPOSITS = 'FETCH_DEPOSITS';
export const FETCH_WITHDRAWALS = 'FETCH_WITHDRAWALS';
export const FETCH_CLAIMABLE_AMPLESENSE_BALANCE = 'FETCH_CLAIMABLE_AMPLESENSE_BALANCE';
export const MAKE_CLAIM = "MAKE_CLAIM";
export const FETCH_TOTAL_STAKED = "FETCH_TOTAL_STAKED";


export function setVaultType(vaultType) {
  return {
    type: SET_VAULT_TYPE,
    payload: vaultType
  };
}

export function fetchAMPLBalance(balance) {
  return {
    type: FETCH_AMPL_BALANCE,
    payload: balance
  };
}

export function fetchAMPLAmplesenseBalance(balance) {
  return {
    type: FETCH_AMPL_AMPLESENSE_BALANCE,
    payload: balance
  };
}
export function fetchClaimableBalance(balance) {
  return {
    type: FETCH_CLAIMABLE_AMPLESENSE_BALANCE,
    payload: balance
  };
}
export function fetchTotalStaked(balance) {
  return {
    type: FETCH_TOTAL_STAKED,
    payload: balance
  };
}
export function fetchKMPLPrice(price) {
  return {
    type: FETCH_KMPL_PRICE,
    payload: price
  };
}

export function fetchReward(eth, token) {
  return {
    type: FETCH_REWARD,
    payload: {eth : eth, token: token}
  };
}

export function checkAllowance(amount) {
  return {
    type: FETCH_ALLOWANCE,
    payload: amount
  };
}
export function makeDeposit(tx) {
  return {
    type: MAKE_DEPOSIT,
    payload: {deposit_tx: tx}
  };
}
export function makeClaim(hash, mined) {
  return {
    type: MAKE_CLAIM,
    payload: {hash: hash, mined: mined}
  };
}
export function makeWithdrawal(tx) {
  return {
    type: MAKE_WITHDRAWAL,
    payload: {withdrawal_tx: tx}
  };
}
export function fetchGasPriceFastest(price) {
  return {
    type: FETCH_GAS_PRICE_FASTEST,
    payload: price
  };
}
export function fetchGasPriceFast(price) {
  return {
    type: FETCH_GAS_PRICE_FAST,
    payload: price
  };
}
export function fetchGasPriceAverage(price) {
  return {
    type: FETCH_GAS_PRICE_AVERAGE,
    payload: price
  };
}
export function fetchDeposits(deposits) {
  return {
    type: FETCH_DEPOSITS,
    payload: deposits
  };
}
export function fetchWithdrawals(withdrawals) {
  return {
    type: FETCH_WITHDRAWALS,
    payload: withdrawals
  };
}
