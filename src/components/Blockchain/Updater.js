import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchAMPLBalance, fetchDeposits, fetchWithdrawals, fetchAMPLAmplesenseBalance, fetchKMPLPrice} from "../../actions/blockchain";
const erc20Abi = require("../../contracts/ERC20.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");

const axios = require('axios')

const AMPL = 'AMPL'
const WETH = 'WETH'
const KMPL = 'KMPL'

const ASSET_ADDRESSES = {
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  AMPL: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
  KMPL: '0xe8d17542dfe79ff4fbd4b850f2d39dc69c4489a2',
  
}


class BlockchainUpdater extends React.Component {

  constructor(props) {
    super(props);
    const timer = setInterval(this.pull, 5000);
    console.log("props updated");
  }

  componentDidMount() {
    const {web3, account, deposits} = this.props;
    const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
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
        const ampl = new web3.eth.Contract(erc20Abi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        ampl.methods.balanceOf(account).call().then(balance => {
        const toHuman = balance / 10**9;
        this.props.dispatch(fetchAMPLBalance(toHuman));
        })

      //get AMPL balance on AmplesenseVault
        const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
        ampleSenseVault.methods.balanceOf(account).call().then(balance => {
        const toHuman = balance / 10**9;
        this.props.dispatch(fetchAMPLAmplesenseBalance(toHuman));
        })
        
    }

    //Fetch info for general purpose, no need to be connected
    //get kMPL price
    axios.get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${ASSET_ADDRESSES[KMPL]}`).then(resp => {
    const kMPLPrice = resp.data.market_data.current_price.usd
    this.props.dispatch(fetchKMPLPrice(kMPLPrice));
    console.log('here', resp.data.market_data.current_price.usd);
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
