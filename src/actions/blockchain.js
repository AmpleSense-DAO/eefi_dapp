export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';


export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_AV_TOKEN_REWARD = 'FETCH_AV_TOKEN_REWARD';
export const FETCH_AV_ETH_REWARD = 'FETCH_AV_ETH_REWARD';
export const FETCH_AV_ALLOWANCE = 'FETCH_AV_ALLOWANCE';
export const MAKE_AV_DEPOSIT = 'MAKE_AV_DEPOSIT';
export const MAKE_AV_WITHDRAWAL = 'MAKE_AV_WITHDRAWAL';
export const FETCH_GAS_PRICE_FASTEST = 'FETCH_GAS_PRICE_FASTEST';
export const FETCH_GAS_PRICE_FAST = 'FETCH_GAS_PRICE_FAST';
export const FETCH_GAS_PRICE_AVERAGE = 'FETCH_GAS_PRICE_AVERAGE';
export const FETCH_AV_DEPOSITS = 'FETCH_AV_DEPOSITS';
export const FETCH_AV_WITHDRAWALS = 'FETCH_AV_WITHDRAWALS';

export const FETCH_KMPL_BALANCE = 'FETCH_KMPL_BALANCE';
export const FETCH_KMPL_AMPLESENSE_BALANCE = 'FETCH_KMPL_AMPLESENSE_BALANCE';
export const FETCH_KV_TOKEN_REWARD = 'FETCH_KV_TOKEN_REWARD';
export const FETCH_KV_ETH_REWARD = 'FETCH_KV_ETH_REWARD';
export const FETCH_KV_DEPOSITS = 'FETCH_KV_DEPOSITS';
export const FETCH_KV_WITHDRAWALS = 'FETCH_KV_WITHDRAWALS';
export const FETCH_KV_ALLOWANCE = 'FETCH_KV_ALLOWANCE';
export const MAKE_KV_DEPOSIT = 'MAKE_KV_DEPOSIT';
export const MAKE_KV_WITHDRAWAL = 'MAKE_KV_WITHDRAWAL';

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
export function fetchKMPLPrice(price) {
  return {
    type: FETCH_KMPL_PRICE,
    payload: price
  };
}

export function fetchAVETHReward(amount) {
  return {
    type: FETCH_AV_ETH_REWARD,
    payload: amount
  };
}

export function fetchAVTokenReward(amount) {
  return {
    type: FETCH_AV_TOKEN_REWARD,
    payload: amount
  };
}

export function checkAVAllowance(amount) {
  return {
    type: FETCH_AV_ALLOWANCE,
    payload: amount
  };
}
export function makeAVDeposit(tx_deposit, tx_allowance) {
  return {
    type: MAKE_AV_DEPOSIT,
    payload: {deposit_tx: tx_deposit, allowance_tx: tx_allowance}
  };
}
export function makeAVWithdrawal(tx) {
  return {
    type: MAKE_AV_WITHDRAWAL,
    payload: tx
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
export function fetchAVDeposits(deposits) {
  return {
    type: FETCH_AV_DEPOSITS,
    payload: deposits
  };
}
export function fetchAVWithdrawals(withdrawals) {
  return {
    type: FETCH_AV_WITHDRAWALS,
    payload: withdrawals
  };
}

export function fetchKMPLBalance(balance) {
  return {
    type: FETCH_KMPL_BALANCE,
    payload: balance
  };
}
export function fetchKMPLAmplesenseBalance(balance) {
  return {
    type: FETCH_KMPL_AMPLESENSE_BALANCE,
    payload: balance
  };
}
export function fetchKVETHReward(amount) {
  return {
    type: FETCH_KV_ETH_REWARD,
    payload: amount
  };
}

export function fetchKVTokenReward(amount) {
  return {
    type: FETCH_KV_TOKEN_REWARD,
    payload: amount
  };
}
export function fetchKVDeposits(deposits) {
  return {
    type: FETCH_KV_DEPOSITS,
    payload: deposits
  };
}
export function fetchKVWithdrawals(withdrawals) {
  return {
    type: FETCH_KV_WITHDRAWALS,
    payload: withdrawals
  };
}

export function checkKVAllowance(amount) {
  return {
    type: FETCH_KV_ALLOWANCE,
    payload: amount
  };
}

export function makeKVDeposit(tx_deposit, tx_allowance) {
  return {
    type: MAKE_KV_DEPOSIT,
    payload: {deposit_tx: tx_deposit, allowance_tx: tx_allowance}
  };
}



export function makeKVWithdrawal(tx) {
  return {
    type: MAKE_KV_WITHDRAWAL,
    payload: tx
  };
}