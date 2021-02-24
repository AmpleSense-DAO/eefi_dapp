import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchAMPLBalance} from "../../actions/blockchain";
const erc20Abi = require("../../contracts/ERC20.json");

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
    if(account) {
        const ampl = new web3.eth.Contract(erc20Abi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        ampl.methods.balanceOf(account).call().then(balance => {
        const toHuman = web3.utils.fromWei(balance, "ether");
        this.props.dispatch(fetchAMPLBalance(toHuman));
        })
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
