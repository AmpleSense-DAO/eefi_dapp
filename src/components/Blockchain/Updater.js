import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchAMPLBalance,
  fetchDeposits,
  fetchWithdrawals,
  fetchAMPLAmplesenseBalance,
  fetchClaimableBalance,
  fetchTotalStaked,
  fetchKMPLPrice,
  fetchGasPriceFastest,
  fetchGasPriceFast,
  fetchGasPriceAverage,
  fetchReward
} from "../../actions/blockchain";

const erc20Abi = require("../../contracts/ERC20.json");
const erc721Abi = require("../../contracts/ERC721.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const StakingERC20Abi = require("../../contracts/StakingERC20.json");
const StakingERC721Abi = require("../../contracts/StakingERC721.json");

const axios = require('axios')

//define variables for contract addresses
export const CONTRACT_ADDRESSES = {
  AMPLE_SENSE_VAULT: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
  AMPLE_CONTRACT: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  KMPL_CONTRACT: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  PIONEER1_CONTRACT: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
  PIONEER2_CONTRACT: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
  LPSTAKING_CONTRACT: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
  NFT1_CONTRACT: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  NFT2_CONTRACT: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  Univ3_EEFI_ETH_CONTRACT: ''
}

export const VaultType = {
  AMPLESENSE : {vault: CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, staking_token: CONTRACT_ADDRESSES.AMPLE_CONTRACT, vault_abi: AmplesenseVaultAbi, staking_token_abi: erc20Abi, staking_symbol: "AMPL", precision: 9, name: "Elastic Vault: AMPL > EEFI", path: "/src/images/tokens/ample.png"},
  PIONEER1A : {vault: CONTRACT_ADDRESSES.PIONEER1_CONTRACT, staking_token: CONTRACT_ADDRESSES.NFT1_CONTRACT, vault_abi: StakingERC721Abi, staking_token_abi: erc721Abi, staking_symbol: "EEFI/USDC", precision: 1, name: "EEFI/USDC LP Vault", path: "/tables/media/new_ee_balancer.png"},
  PIONEER1B : {vault: CONTRACT_ADDRESSES.PIONEER1_CONTRACT, staking_token: CONTRACT_ADDRESSES.NFT2_CONTRACT, vault_abi: StakingERC721Abi, staking_token_abi: erc721Abi, staking_symbol: "kMPL/ETH", precision: 1, name: "kMPL/ETH LP Vault", path: "/tables/media/kmpl_uni_logo.png"},
  PIONEER2 : {vault: CONTRACT_ADDRESSES.PIONEER2_CONTRACT, staking_token: CONTRACT_ADDRESSES.KMPL_CONTRACT, vault_abi: StakingERC20Abi, staking_token_abi: erc20Abi, staking_symbol: "kMPL", precision: 9, name: "Pioneer Fund Vault II: kMPL", path: "/tables/media/kappa_logo_kmpl.png"},
  LPSTAKING : {vault: CONTRACT_ADDRESSES.LPSTAKING_CONTRACT, staking_token: CONTRACT_ADDRESSES.Univ3_EEFI_ETH_CONTRACT, vault_abi: StakingERC20Abi, staking_token_abi: erc20Abi, staking_symbol: "Zeus NFT", precision: 18, name: "EEFI/ETH LP Token Vault", path: "/tables/media/apollo_cropped_edited_sm.png"}
}

export class VaultContract {

  state = {web3: null, type: VaultType.AMPLESENSE, account: ""}

  constructor(vaultType, web3, account) {
    // super();
    this.state = {web3: web3, type: vaultType, account: account};
  }

  vaultName() {
    return this.state.type.name;
  }

  stakingTokenPrecision() {
    return this.state.type.precision;
  }

  stakingTokenSymbol() {
    return this.state.type.staking_symbol;
  }

  tokenImagePath() {
    return this.state.type.path;
  }

  allowance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    if(this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.isApprovedForAll(this.state.account, CONTRACT_ADDRESSES.PIONEER1).call();
    } else {
      return contract.methods.allowance(this.state.account, this.state.type.vault).call();
    }
  }

  stakingTokenBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    return contract.methods.balanceOf(this.state.account).call()
  }

  totalStaked() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.methods.totalStaked().call()
  }

  stakedTokenTotalBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.balanceOf(this.state.account).call()
    } else {
      return contract.methods.totalStakedFor(this.state.account).call()
    }
  }

  stakedTokenClaimableBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.totalClaimableBy(this.state.account).call()
    } else {
      return contract.methods.totalStakedFor(this.state.account).call()
    }
  }

  approve(amount) {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    if(this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.setApprovalForAll(CONTRACT_ADDRESSES.PIONEER1, true).send({from: this.state.account});
    } else {
      return contract.methods.approve(this.state.type.vault, amount.toString()).send({from: this.state.account});
    }
  }

  stake(amount) {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.makeDeposit(amount.toString()).send({from: this.state.account});
    } else if(this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.stake(amount.toString(), this.state.type.staking_token).send({from: this.state.account});
    }
    else {
      return contract.methods.stake(amount.toString(), "0x").send({from: this.state.account});
    }
  }

  unstake(amount) {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.withdraw(amount.toString()).send({from: this.state.account});
    } else if(this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.unstake(amount.toString(), this.state.type.staking_token).send({from: this.state.account});
    }
     else {
      return contract.methods.unstake(amount.toString(), "0x").send({from: this.state.account});
    }
  }

  claim() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.claim().send({from: this.state.account});
    } else {
      return contract.methods.withdraw("0").send({from: this.state.account});
    }
  }

  getReward() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.methods.getReward(this.state.account).call();
  }

  getDepositEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.events.Deposit({ fromBlock: 0, filter: { account:  this.state.account }, });
    } else {
      return contract.events.Staked({ fromBlock: 0, filter: { addr:  this.state.account }, });
    }
  }

  getWithdrawalEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if(this.state.type === VaultType.AMPLESENSE) {
      return contract.events.Withdrawal({ fromBlock: 0, filter: { account:  this.state.account }, });
    } else {
      return contract.events.Unstaked({ fromBlock: 0, filter: { addr:  this.state.account }, });
    }
  }
}

class BlockchainUpdater extends React.Component {

  timer = null;

  // constructor(props) {
  //   super(props);
  // }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getVaultType = [VaultType.AMPLESENSE, VaultType.PIONEER1A, VaultType.PIONEER2, VaultType.LPSTAKING, VaultType.PIONEER1B]

  componentDidMount() {
    const {web3, account,vault_type} = this.props;
    console.log("UUUUUUUUUUUUUUUUP", vault_type)
    const contract = new VaultContract(this.getVaultType[vault_type], web3, account);
    const that = this;
    this.timer = setInterval(this.pull, 15000);
    this.pull();
    that.props.dispatch(fetchDeposits(null));
    that.props.dispatch(fetchWithdrawals(null));
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
    // console.log('here', resp.data.market_data.current_price.usd);
    }).catch(e => {
      // in case of failure set price to $50
      this.props.dispatch(fetchKMPLPrice(50));
    });
  }

  render() {
    return <div/>
  }

  pull = () => {
    const {web3, account, vault_type} = this.props;
    // const contract = new VaultContract(this.getVaultType[vault_type], web3, account);

    this.props.dispatch(fetchAMPLBalance(this.getVaultType[vault_type], web3, account));

    this.props.dispatch(fetchAMPLAmplesenseBalance(this.getVaultType[vault_type], web3, account));

    this.props.dispatch(fetchClaimableBalance(this.getVaultType[vault_type], web3, account));

    this.props.dispatch(fetchTotalStaked(this.getVaultType[vault_type], web3, account));

    this.props.dispatch(fetchReward(this.getVaultType[vault_type], web3, account));

    // get pas prices
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
      withdrawals : store.blockchain.withdrawals,
      vault_type : store.blockchain.vault_type,
    };
  }

export default withRouter(connect(mapStateToProps)(BlockchainUpdater));
