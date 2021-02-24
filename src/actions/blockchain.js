export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';

export function fetchAMPLBalance(balance) {
  return {
    type: FETCH_AMPL_BALANCE,
    payload: balance
  };
}
