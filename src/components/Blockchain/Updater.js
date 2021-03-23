import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchAMPLBalance,
  fetchDeposits,
  fetchWithdrawals,
  fetchAMPLAmplesenseBalance,
  fetchClaimableBalance,
  fetchKMPLPrice,
  fetchGasPriceFastest,
  fetchGasPriceFast,
  fetchGasPriceAverage,
  fetchReward
} from "../../actions/blockchain";

const erc20Abi = require("../../contracts/ERC20.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const StakingERC20Abi = require("../../contracts/StakingERC20.json");

const axios = require('axios')

//define variables for contract addresses
export const CONTRACT_ADDRESSES = {
  AMPLE_SENSE_VAULT: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  AMPLE_CONTRACT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  KMPL_CONTRACT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  PIONEER1_CONTRACT: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  PIONEER2_CONTRACT: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  LPSTAKING_CONTRACT: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  NFT_CONTRACT: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  Univ3_EEFI_ETH_CONTRACT: ''
}

export const VaultType = {
  AMPLESENSE : "amplesense",
  PIONEER1 : "pioneer1",
  PIONEER2 : "pioneer2",
  LPSTAKING : "lpstaking"
}

export class VaultContract {

  state = {web3: null, type: VaultType.AMPLESENSE, account: ""}

  constructor(vaultType, web3, account) {
    // super();
    this.state = {web3: web3, type: vaultType, account: account};
  }

  allowance() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
        return contract.methods.allowance(this.state.account, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT).call();
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(erc721Abi.abi, CONTRACT_ADDRESSES.NFT_CONTRACT);
        return contract.methods.isApprovedForAll(this.state.account, CONTRACT_ADDRESSES.PIONEER1).call();
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.KMPL_CONTRACT);
        return contract.methods.allowance(this.state.account, CONTRACT_ADDRESSES.PIONEER2).call();
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.Univ3_EEFI_ETH_CONTRACT);
        return contract.methods.allowance(this.state.account, CONTRACT_ADDRESSES.LPSTAKING).call();
    }
  }

  stakingTokenBalance() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
        return contract.methods.balanceOf(this.state.account).call()
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.NFT_CONTRACT);
        return contract.methods.balanceOf(this.state.account).call()
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.KMPL_CONTRACT);
        return contract.methods.balanceOf(this.state.account).call()
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.Univ3_EEFI_ETH_CONTRACT);
        return contract.methods.balanceOf(this.state.account).call()
    }
  }

  stakedTokenTotalBalance() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.balanceOf(this.state.account).call()
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
    }
  }

  stakedTokenClaimableBalance() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.totalClaimableBy(this.state.account).call()
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.totalStakedFor(this.state.account).call()
    }
  }

  approve(amount) {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
        return contract.methods.approve(CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, amount.toString()).send({from: this.state.account});
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(erc721Abi.abi, CONTRACT_ADDRESSES.NFT_CONTRACT);
        return contract.methods.setApprovalForAll(CONTRACT_ADDRESSES.PIONEER1, true).send({from: this.state.account});
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.KMPL_CONTRACT);
        return contract.methods.approve(CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, amount.toString()).send({from: this.state.account});
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.Univ3_EEFI_ETH_CONTRACT);
        return contract.methods.approve(CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, amount.toString()).send({from: this.state.account});
      }
  }

  stake(amount) {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.makeDeposit(amount.toString()).send({from: this.state.account});
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.stake(amount.toString(), "0x").send({from: this.state.account});
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.stake(amount.toString(), "0x").send({from: this.state.account});
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.stake(amount.toString(), "0x").send({from: this.state.account});
    }
  }

  unstake(amount) {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.withdraw(amount.toString()).send({from: this.state.account});
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.unstake(amount.toString(), "0x").send({from: this.state.account});
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.unstake(amount.toString(), "0x").send({from: this.state.account});
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.unstake(amount.toString(), "0x").send({from: this.state.account});
    }
  }

  claim() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.claim().send({from: this.state.account});
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.withdraw("0").send({from: this.state.account});
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.withdraw("0").send({from: this.state.account});
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.withdraw("0").send({from: this.state.account});
    }
  }

  getReward() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.methods.getReward(this.state.account).call();
      case VaultType.PIONEER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.methods.getReward(this.state.account).call();
      case VaultType.PIONEER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.methods.getReward(this.state.account).call();
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.methods.getReward(this.state.account).call();
    }
  }

  getDepositEvent() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.events.Deposit({ fromBlock: 0, filter: { account:  this.state.account }, });
      case VaultType.PIONNER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.events.Staked({ fromBlock: 0, filter: { addr:  this.state.account }, });
      case VaultType.PIONNER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.events.Staked({ fromBlock: 0, filter: { addr:  this.state.account }, });
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.events.Staked({ fromBlock: 0, filter: { addr:  this.state.account }, });
    }
  }

  getWithdrawalEvent() {
    switch(this.state.type) {
      case VaultType.AMPLESENSE:
        const contract = new this.state.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        return contract.events.Withdrawal({ fromBlock: 0, filter: { account:  this.state.account }, });
      case VaultType.PIONNER1:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER1_CONTRACT);
        return contract.events.Unstaked({ fromBlock: 0, filter: { addr:  this.state.account }, });
      case VaultType.PIONNER2:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        return contract.events.Unstaked({ fromBlock: 0, filter: { addr:  this.state.account }, });
      case VaultType.LPSTAKING:
        const contract = new this.state.web3.eth.Contract(StakingERC20Abi.abi, CONTRACT_ADDRESSES.LPSTAKING_CONTRACT);
        return contract.events.Unstaked({ fromBlock: 0, filter: { addr:  this.state.account }, });
    }
  }
}

class BlockchainUpdater extends React.Component {

  constructor(props) {
    super(props);
    const timer = setInterval(this.pull, 15000);
    this.pull();
  }

  componentDidMount() {
    const {web3, account} = this.props;
    const contract = new VaultContract(VaultType.AMPLESENSE, web3, account);
    const that = this;
    //fetch passed events
    contract.getDepositEvent().on( 'data', function(event) {
      //add timestamp
      web3.eth.getBlock(event.blockNumber).then(block => {
        event.timestamp = block.timestamp;
        that.props.dispatch(fetchDeposits(event));
      })
    }).on('error', console.error);
    //fetch passed events
    contract.getWithdrawalEvent().on( 'data', function(event) {
      //add timestamp
      web3.eth.getBlock(event.blockNumber).then(block => {
        event.timestamp = block.timestamp;
        that.props.dispatch(fetchWithdrawals(event));
      })
    }).on('error', console.error);

    //get kMPL price
    axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${CONTRACT_ADDRESSES.KMPL_CONTRACT}`).then(resp => {
    const kMPLPrice = resp.data.market_data.current_price.usd
    this.props.dispatch(fetchKMPLPrice(kMPLPrice));
 //   console.log('here', resp.data.market_data.current_price.usd);
    }).catch(e => {
      //in case of failure set price to $50
      this.props.dispatch(fetchKMPLPrice(50));
    });
  }

  render() {
    return <div/>
  }

  pull = () => {
    const {web3, account} = this.props;
    const contract = new VaultContract(VaultType.AMPLESENSE, web3, account);

    contract.stakingTokenBalance().then(balance => {
      this.props.dispatch(fetchAMPLBalance(balance));
    });

    //get AMPL balance on AmplesenseVault
    contract.stakedTokenTotalBalance().then(balance => {
      this.props.dispatch(fetchAMPLAmplesenseBalance(balance));
    });

    contract.stakedTokenClaimableBalance().then(balance => {
      this.props.dispatch(fetchClaimableBalance(balance));
    });
  
    //get rewards for the AmplesenseVault (ETH and EEFI)
    contract.getReward().then(rewards => {
      var ethReward = rewards[0];
      var tokenReward = rewards[1];
      this.props.dispatch(fetchReward(ethReward, tokenReward));
    });
 
  //get pas prices
    axios.get('https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=db84e1509032bc4cc4f96d1c8791d92b667d28adc606bda9480c9a616310').then(ethGasStationResponse => {
      const ethGasStationData = ethGasStationResponse.data    
      this.props.dispatch(fetchGasPriceFastest(Math.floor(ethGasStationData.fastest / 10)));
      this.props.dispatch(fetchGasPriceFast(Math.floor(Math.floor(ethGasStationData.fast / 10))));
      this.props.dispatch(fetchGasPriceAverage(Math.floor(ethGasStationData.average / 10)));    
    });
  }
}

function mapStateToProps(store) {
    return {
      web3: store.auth.web3,
      account : store.auth.account,
      deposits : store.blockchain.deposits,
      withdrawals : store.blockchain.withdrawals
    };
  }
  
export default withRouter(connect(mapStateToProps)(BlockchainUpdater));
