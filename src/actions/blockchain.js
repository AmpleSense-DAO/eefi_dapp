export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_ALLOWANCE = 'FETCH_ALLOWANCE';
export const MAKE_APPROVAL = 'MAKE_APPROVAL';
export const MAKE_DEPOSIT = 'MAKE_DEPOSIT';
export const MAKE_WITHDRAWAL = 'MAKE_WITHDRAWAL';
export const FETCH_DEPOSITS = 'FETCH_DEPOSITS';
export const FETCH_WITHDRAWALS = 'FETCH_WITHDRAWALS';

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