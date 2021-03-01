export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_AV_TOKEN_REWARD = 'FETCH_AV_TOKEN_REWARD';
export const FETCH_AV_ETH_REWARD = 'FETCH_AV_ETH_REWARD';
export const FETCH_ALLOWANCE = 'FETCH_ALLOWANCE';
export const MAKE_APPROVAL = 'MAKE_APPROVAL';
export const MAKE_DEPOSIT = 'MAKE_DEPOSIT';
export const MAKE_WITHDRAWAL = 'MAKE_WITHDRAWAL';
export const FETCH_GAS_PRICE_FASTEST = 'FETCH_GAS_PRICE_FASTEST';
export const FETCH_GAS_PRICE_FAST = 'FETCH_GAS_PRICE_FAST';
export const FETCH_GAS_PRICE_AVERAGE = 'FETCH_GAS_PRICE_AVERAGE';


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

export function checkAllowance(amount) {
  return {
    type: FETCH_ALLOWANCE,
    payload: amount
  };
}
export function makeApproval(tx) {
  return {
    type: MAKE_APPROVAL,
    payload: tx
  };
}
export function makeDeposit(tx) {
  return {
    type: MAKE_DEPOSIT,
    payload: tx
  };
}
export function makeWithdrawal(tx) {
  return {
    type: MAKE_WITHDRAWAL,
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

