export const FETCH_AMPL_BALANCE = 'FETCH_AMPL_BALANCE';
export const FETCH_AMPL_AMPLESENSE_BALANCE = 'FETCH_AMPL_AMPLESENSE_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';

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
