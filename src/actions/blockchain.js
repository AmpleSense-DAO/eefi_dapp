import { VaultContract, VaultType, vaultTypeFromID } from "../components/Blockchain/Updater";
export const SET_VAULT_TYPE = 'SET_VAULT_TYPE';
export const FETCH_STAKING_TOKEN_BALANCE = 'FETCH_STAKING_TOKEN_BALANCE';
export const FETCH_STAKED_BALANCE = 'FETCH_STAKED_BALANCE';
export const FETCH_KMPL_PRICE = 'FETCH_KMPL_PRICE';
export const FETCH_EEFI_PRICE = 'FETCH_EEFI_PRICE';
export const FETCH_AMPL_PRICE = 'FETCH_AMPL_PRICE';
export const FETCH_ZNFT_PRICE = 'FETCH_ZNFT_PRICE';
export const FETCH_ANFT_PRICE = 'FETCH_ANFT_PRICE';
export const FETCH_ETH_PRICE = 'FETCH_ETH_PRICE';
export const FETCH_REWARD = 'FETCH_REWARD';
export const FETCH_ALLOWANCE = 'FETCH_ALLOWANCE';
export const MAKE_DEPOSIT = 'MAKE_DEPOSIT';
export const MAKE_WITHDRAWAL = 'MAKE_WITHDRAWAL';
export const FETCH_GAS_PRICE_FASTEST = 'FETCH_GAS_PRICE_FASTEST';
export const FETCH_GAS_PRICE_FAST = 'FETCH_GAS_PRICE_FAST';
export const FETCH_GAS_PRICE_AVERAGE = 'FETCH_GAS_PRICE_AVERAGE';
export const FETCH_DEPOSITS = 'FETCH_DEPOSITS';
export const FETCH_WITHDRAWALS = 'FETCH_WITHDRAWALS';
export const FETCH_STAKABLE_NFTS = 'FETCH_STAKABLE_NFTS';
export const ADD_DEPOSIT = 'ADD_DEPOSIT';
export const ADD_WITHDRAWAL = 'ADD_WITHDRAWAL';
export const FETCH_CLAIMABLE_AMPLESENSE_BALANCE = 'FETCH_CLAIMABLE_AMPLESENSE_BALANCE';
export const MAKE_CLAIM = "MAKE_CLAIM";
export const FETCH_TOTAL_STAKED = "FETCH_TOTAL_STAKED";
export const FETCH_VAULT_VALUE = "FETCH_VAULT_VALUE";
export const FETCH_TVL_VALUE = "FETCH_TVL_VALUE";

export function setVaultType(vaultType) {
  return {
    type: SET_VAULT_TYPE,
    payload: vaultType
  };
}

export function fetchStakingTokenBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakingTokenBalance().then(balance => {
      dispatch({
        type: FETCH_STAKING_TOKEN_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchStakedBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakedTokenTotalBalance().then(balance => {
      dispatch({
        type: FETCH_STAKED_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchClaimableBalance(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.stakedTokenClaimableBalance().then(balance => {
      dispatch({
        type: FETCH_CLAIMABLE_AMPLESENSE_BALANCE,
        payload: balance
      });
    });
  };
}

export function fetchTotalStaked(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.totalStaked().then(balance => {
      dispatch({
        type: FETCH_TOTAL_STAKED,
        payload: balance
      });
    });
  };
}

export function fetchAMPLPrice(price) {
  return {
    type: FETCH_AMPL_PRICE,
    payload: price
  };
}

export function fetchKMPLPrice(price) {
  return {
    type: FETCH_KMPL_PRICE,
    payload: price
  };
}

export function fetchZNFTPrice(price) {
  return {
    type: FETCH_ZNFT_PRICE,
    payload: price
  };
}

export function fetchANFTPrice(price) {
  return {
    type: FETCH_ANFT_PRICE,
    payload: price
  };
}

export function fetchEEFIPrice(price) {
  return {
    type: FETCH_EEFI_PRICE,
    payload: price
  };
}

export function fetchETHPrice(price) {
  return {
    type: FETCH_ETH_PRICE,
    payload: price
  };
}

export function fetchReward(vaultTypes, web3, account) {
  const contract = new VaultContract(vaultTypes, web3, account);
  return function(dispatch) {
    contract.getReward().then(rewards => {
      dispatch({
        type: FETCH_REWARD,
        payload: {eth : rewards[0], token: rewards[1]}
      });
    });
  };
}

export function checkAllowance(amount) {
  return {
    type: FETCH_ALLOWANCE,
    payload: amount
  };
}
export function makeDeposit(vaultTypes, web3, account, valueWei, tx) {
  const contract = new VaultContract(vaultTypes, web3, account);
  const current_time = Math.floor(Date.now()/1000);
  return function(dispatch) {
    dispatch({
      type: MAKE_DEPOSIT,
      payload: {deposit_tx: tx}
    });
    contract.allowance().then(allowance => {
      const all = new web3.utils.BN(allowance.toString());
      checkAllowance(all);
      const to_allow = new web3.utils.BN(valueWei.gt(all)? valueWei.sub(all) : "0");
      if(to_allow > 0 || allowance === false /*NFT case*/) {
        contract.approve(valueWei).once('transactionHash', hash_allowance => {
          contract.getStakableNFTTokens().then(tokens => {
            contract.stake(valueWei.toString())
            .once('transactionHash', hash_deposit => {
                dispatch({
                  type: MAKE_DEPOSIT,
                  payload: {deposit_tx: {id: current_time, transactionHash: hash_deposit, allowanceHash: hash_allowance, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false, allowanceMined: false}}
                });
              }).then(receipt => {
                //after it's mined, update
                dispatch({
                  type: MAKE_DEPOSIT,
                  payload: {deposit_tx: {id: current_time, mined: true}}
                });
              });
          })
        }).then(receipt => {
          //after it's mined, update
          dispatch({
            type: MAKE_DEPOSIT,
            payload: {deposit_tx: {id: current_time, allowanceMined: true}}
          });
        });
      } else {
        contract.getStakableNFTTokens().then(tokens => {
          contract.stake(valueWei).once('transactionHash', hash_deposit => {
            dispatch({
              type: MAKE_DEPOSIT,
              payload: {deposit_tx: {id: current_time, transactionHash: hash_deposit, allowanceHash: null}}
            });
          }).then(receipt => {
            //after it's mined, update
            dispatch({
              type: MAKE_DEPOSIT,
              payload: {deposit_tx: {id: current_time, mined: true}}
            });
          });
        });
      }
    });
  };
}
export function makeClaim(hash, mined) {
  return {
    type: MAKE_CLAIM,
    payload: {hash: hash, mined: mined}
  };
}
export function makeWithdrawal(vaultTypes, web3, account, valueWei, tx) {
  const contract = new VaultContract(vaultTypes, web3, account);
  const current_time = Math.floor(Date.now()/1000);
  return function(dispatch) {
    dispatch({
      type: MAKE_WITHDRAWAL,
      payload: {withdrawal_tx: tx}
    });
    contract.unstake(valueWei).once('transactionHash', hash => {
      //got tx
      dispatch({
        type: MAKE_WITHDRAWAL,
        payload: {withdrawal_tx: {id: current_time, transactionHash: hash}}
      });
    }).then(receipt => {
      dispatch({
        type: MAKE_WITHDRAWAL,
        payload: {withdrawal_tx: {id: current_time, mined: true}}
      });
    });
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
export function fetchDeposits(vaultType, web3, account) {
  const contract = new VaultContract(vaultType, web3, account);
  return function(dispatch) {
    //fetch passed events
    contract.getDepositEvent().then(events => {
      //add timestamps
      let block_promises = events.map(event => {
        return web3.eth.getBlock(event.blockNumber);
      })
      Promise.all(block_promises).then(blocks => {
        events = blocks.map((block, index) => {
          events[index].timestamp = block.timestamp;
          return events[index];
        })
        dispatch({
          type: FETCH_DEPOSITS,
          payload: {events : events}
        });
      })
    })
  };
}

export function fetchStakableNFTs(vaultType, web3, account) {
  const contract = new VaultContract(vaultType, web3, account);
  return function(dispatch) {
    contract.getStakableNFTTokens().then(stakable => {
      dispatch({
        type: FETCH_STAKABLE_NFTS,
        payload: {stakableNfts : stakable}
      })
    });
  };
}

export function fetchWithdrawals(vaultType, web3, account) {
  const contract = new VaultContract(vaultType, web3, account);
  return function(dispatch) {
    //fetch passed events
    contract.getWithdrawalEvent().then(events => {
      //add timestamps
      let block_promises = events.map(event => {
        return web3.eth.getBlock(event.blockNumber);
      })
      Promise.all(block_promises).then(blocks => {
        events = blocks.map((block, index) => {
          events[index].timestamp = block.timestamp;
          return events[index];
        })
        dispatch({
          type: FETCH_WITHDRAWALS,
          payload: {events : events}
        });
      })
    })
  };
}

export function fetchTVLHistory(web3, account) {
  return function(dispatch) {
    let promises = [];
    vaultTypeFromID.forEach(type => {
      const contract = new VaultContract(type, web3, account);
      promises.push(new Promise(async (resolve, reject) => {
        const changes = await contract.getStakeChangedEvent();
        resolve({changes, contract});
      }));
    });
    Promise.all(promises).then((results) => {
      const merged = [].concat.apply([], results);
      
      dispatch({
        type: FETCH_TVL_VALUE,
        payload: merged
      });
    })
  };
}

export function fetchTotalBalances(web3, account) {
  return function(dispatch) {
    vaultTypeFromID.forEach(type => {
      const contract = new VaultContract(type, web3, account);
      Promise.all([
        contract.stakedTokenTotalBalance(),
        contract.getReward(),
        contract.totalStaked()
      ]).then(([stakedBalance, rewardBalance, totalStakedBalance]) => {
        const stakedAdustedBalance = stakedBalance / 10**contract.stakingTokenPrecision();
        const totalStakedAdjustedBalance = totalStakedBalance / 10**contract.stakingTokenPrecision();
        //sometimes the reward has token + eth, sometimes just the token, in which case rewardBalance isnt an object
        let rewardTokenBalance = rewardBalance.token? rewardBalance.token : rewardBalance;
        let rewardTokenAdjustedBalance = rewardTokenBalance / 10**contract.rewardTokenPrecision();
        let rewardAdjustedBalance;
        if(rewardBalance.token) {
          rewardAdjustedBalance = { token: rewardTokenAdjustedBalance, eth : parseFloat(web3.utils.fromWei(rewardBalance.eth)) };
        } else {
          rewardAdjustedBalance = rewardTokenAdjustedBalance;
        }
        console.log(type)
        console.log(stakedAdustedBalance)
        console.log(totalStakedAdjustedBalance)
        console.log(rewardAdjustedBalance)
        dispatch({
          type: FETCH_VAULT_VALUE,
          payload: {vaultType : type, stakedBalance : stakedAdustedBalance, totalStakedBalance: totalStakedAdjustedBalance, rewardBalance : rewardAdjustedBalance}
        });
      }).catch((err)=> {
        console.log(err)
      })
    })
  };
}

export function addDeposit(event) {
  return {
    type: ADD_DEPOSIT,
    payload: event
  };
}
export function addWithdrawal(event) {
  return {
    type: ADD_WITHDRAWAL,
    payload: event
  };
}
