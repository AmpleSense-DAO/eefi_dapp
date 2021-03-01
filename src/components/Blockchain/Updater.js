import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchAMPLBalance} from "../../actions/blockchain";
import {fetchAMPLAmplesenseBalance} from "../../actions/blockchain";
import {fetchKMPLPrice} from "../../actions/blockchain";
import {fetchGasPriceFastest} from "../../actions/blockchain";
import {fetchGasPriceFast} from "../../actions/blockchain";
import {fetchGasPriceAverage} from "../../actions/blockchain";
import {fetchAVETHReward} from "../../actions/blockchain";
import {fetchAVTokenReward} from "../../actions/blockchain";

const erc20Abi = require("../../contracts/ERC20.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const VaultRewardsAbi = require("../../contracts/VaultRewards.json");

const axios = require('axios')

//define variables for queried tokens
const AMPL = 'AMPL'
const WETH = 'WETH'
const KMPL = 'KMPL'

const ASSET_ADDRESSES = {
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  AMPL: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
  KMPL: '0xe8d17542dfe79ff4fbd4b850f2d39dc69c4489a2',
  
}

//define variables for contract addresses
const AMPLE_SENSE_VAULT = 'AMPLE_SENSE_VAULT'
const AMPLE_CONTRACT = 'AMPLE_CONTRACT'
const AMPL_VAULT_REWARDS = 'AMPL_VAULT_REWARDS'

const CONTRACT_ADDRESSES = {
  AMPLE_SENSE_VAULT: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  AMPLE_CONTRACT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  AMPL_VAULT_REWARDS: '0x75537828f2ce51be7289709686A69CbFDbB714F1',
  
}

class BlockchainUpdater extends React.Component {

  constructor(props) {
    super(props);
    const timer = setInterval(this.pull, 3000);
    console.log("props updated");
  }
  render() {
    return <div/>
  }
 



  pull = () => {
    console.log("PULLING", this.props);
    const {web3, account} = this.props;
    try {
    if(account) {
        //get AMPL balance
        const ampl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES[AMPLE_CONTRACT]);
        ampl.methods.balanceOf(account).call().then(balance => {
        const toHuman = web3.utils.fromWei(balance, "ether");
        this.props.dispatch(fetchAMPLBalance(toHuman));
        })

        //get AMPL balance on AmplesenseVault
        const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES[AMPLE_SENSE_VAULT]);
        ampleSenseVault.methods.balanceOf(account).call().then(balance => {
        const toHuman = web3.utils.fromWei(balance, "ether");
        this.props.dispatch(fetchAMPLAmplesenseBalance(toHuman));
        })
 
        //get rewards for the AmplesenseVault (ETH and EEFI)
        const VaultRewards = new web3.eth.Contract(VaultRewardsAbi.abi, CONTRACT_ADDRESSES[AMPL_VAULT_REWARDS]);
        VaultRewards.methods.getReward(account).call().then(rewards => {

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

    //Fetch info for general purpose, no need to be connected
    //get kMPL price
    axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${ASSET_ADDRESSES[KMPL]}`).then(resp => {
    const kMPLPrice = resp.data.market_data.current_price.usd
    this.props.dispatch(fetchKMPLPrice(kMPLPrice));
 //   console.log('here', resp.data.market_data.current_price.usd);
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
    };
  }
  
export default withRouter(connect(mapStateToProps)(BlockchainUpdater));
