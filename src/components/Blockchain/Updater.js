import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchAMPLBalance,
  fetchDeposits,
  fetchWithdrawals,
  fetchAMPLAmplesenseBalance,
  fetchKMPLPrice,
  fetchGasPriceFastest,
  fetchGasPriceFast,
  fetchGasPriceAverage,
  fetchAVETHReward,
  fetchAVTokenReward
} from "../../actions/blockchain";

const erc20Abi = require("../../contracts/ERC20.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");

const axios = require('axios')

//define variables for contract addresses
export const CONTRACT_ADDRESSES = {
  AMPLE_SENSE_VAULT: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
  AMPLE_CONTRACT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  KMPL_CONTRACT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  PIONEER1_CONTRACT: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  PIONEER2_CONTRACT: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  LPSTAKING_CONTRACT: '0x0165878A594ca255338adfa4d48449f69242Eb8F'
}

class BlockchainUpdater extends React.Component {

  constructor(props) {
    super(props);
    const timer = setInterval(this.pull, 1000);
  }

  componentDidMount() {
    const {web3, account, deposits} = this.props;
    const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
    const that = this;
    //fetch passed events
    ampleSenseVault.events.Deposit({ fromBlock: 0, filter: { account:  account }, }).on( 'data', function(event) {
      //add timestamp
      web3.eth.getBlock(event.blockNumber).then(block => {
        event.timestamp = block.timestamp;
        that.props.dispatch(fetchDeposits(event));
      })
    }).on('error', console.error);
    //fetch passed events
    ampleSenseVault.events.Withdrawal({ fromBlock: 0, filter: { account:  account }, }).on( 'data', function(event) {
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
    console.log("PULLING", this.props);
    const {web3, account, deposits} = this.props;
    try {
    if(account) {
        //get AMPL balance
        const ampl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
        ampl.methods.balanceOf(account).call().then(balance => {
        const toHuman = balance / 10**9;
        this.props.dispatch(fetchAMPLBalance(toHuman));
        })

        //get AMPL balance on AmplesenseVault
        const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        ampleSenseVault.methods.balanceOf(account).call().then(balance => {
        const toHuman = balance / 10**9;
        this.props.dispatch(fetchAMPLAmplesenseBalance(toHuman));
        })
      
        //get rewards for the AmplesenseVault (ETH and EEFI)
        ampleSenseVault.methods.getReward(account).call().then(rewards => {
          var ethReward = rewards[0];
          var tokenReward = rewards[1];
          this.props.dispatch(fetchAVETHReward(ethReward));
          this.props.dispatch(fetchAVTokenReward(tokenReward));
        })
    }
    else {
        //if not connected, populate reward variables with 0
        this.props.dispatch(fetchAVETHReward(0));
        this.props.dispatch(fetchAVTokenReward(0));
        this.props.dispatch(fetchAMPLAmplesenseBalance(0));
        this.props.dispatch(fetchAMPLBalance(0));
    }
 
    //get pas prices
    axios.get('https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=db84e1509032bc4cc4f96d1c8791d92b667d28adc606bda9480c9a616310').then(ethGasStationResponse => {
      const ethGasStationData = ethGasStationResponse.data    
      this.props.dispatch(fetchGasPriceFastest(Math.floor(ethGasStationData.fastest / 10)));
      this.props.dispatch(fetchGasPriceFast(Math.floor(Math.floor(ethGasStationData.fast / 10))));
      this.props.dispatch(fetchGasPriceAverage(Math.floor(ethGasStationData.average / 10)));    
    });

    } catch(error) {
      console.log('fetching data call failed!', error)
    }
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
