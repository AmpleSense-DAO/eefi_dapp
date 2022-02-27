import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStakingTokenBalance, fetchDeposits, fetchWithdrawals, fetchClaimings, fetchStakedBalance, fetchClaimableBalance, fetchTotalStaked, fetchKMPLPrice, fetchZNFTPrice, fetchANFTPrice, fetchEEFIPrice, fetchAMPLPrice, fetchETHPrice, fetchGasPriceFastest, fetchGasPriceFast, fetchGasPriceAverage, fetchReward, fetchAllowance, fetchStakableNFTs, fetchTotalBalances, fetchTVLHistory } from "../../actions/blockchain";

const erc20Abi = require("../../contracts/ERC20.json");
const erc721Abi = require("../../contracts/ERC721.json");
const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const StakingERC20Abi = require("../../contracts/StakingERC20.json");
const StakingERC721Abi = require("../../contracts/StakingERC721.json");

const axios = require("axios");

//define variables for contract addresses
export const CONTRACT_ADDRESSES = {
  AMPLE_SENSE_VAULT: "0x5f9A579C795e665Fb00032523140e386Edcb99ee",
  AMPLE_CONTRACT: "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
  KMPL_CONTRACT: "0xe8d17542dfe79ff4fbd4b850f2d39dc69c4489a2",
  PIONEER1_CONTRACT: "0x219c426801B2197Da469Fb67257B8Bc7E6Bbcc47",
  PIONEER2_CONTRACT: "0x00a7939715f1AbD59885FFc3F3ddF73a8Cd2f69b",
  PIONEER3_CONTRACT: "0x41aCFd62b7c30145f809207262a723b08e66479c",
  LPSTAKING_CONTRACT: "0xD26572FcAfE2d6d9b4335042b238592AF2529CD2",
  NFT1_CONTRACT: "0x2a99792F7C310874F3C24860c06322E26D162c6B",
  NFT2_CONTRACT: "0x74ee0c3882b97d3d2a04c81c72d16878876329e4",
  Balancer_EEFI_ETH_CONTRACT: "0x844Ba71D4902Ed3dE091112951b9c4B4D25A09DD",
  Univ3_KMPL_ETH_CONTRACT: "0xF00819f1AbeC513A565880a4708596E8dC838027",
  EEFI_CONTRACT: "0x92915c346287DdFbcEc8f86c8EB52280eD05b3A3",
  TOKEN_DISTRIBUTOR: "0xf953b3A269d80e3eB0F2947630Da976B896A8C5b",
};

export const VaultType = {
  AMPLESENSE: { vault: CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, staking_token: CONTRACT_ADDRESSES.AMPLE_CONTRACT, vault_abi: AmplesenseVaultAbi, staking_token_abi: erc20Abi, staking_symbol: "AMPL", precision: 9, reward_token_precision: 18, name: "Elastic Vault: AMPL > EEFI" },
  LPSTAKING: { vault: CONTRACT_ADDRESSES.LPSTAKING_CONTRACT, staking_token: CONTRACT_ADDRESSES.Balancer_EEFI_ETH_CONTRACT, vault_abi: StakingERC20Abi, staking_token_abi: erc20Abi, staking_symbol: "Balancer LP", precision: 18, reward_token_precision: 18, name: "EEFI/ETH LP Token Vault" },
  PIONEER2: { vault: CONTRACT_ADDRESSES.PIONEER2_CONTRACT, staking_token: CONTRACT_ADDRESSES.KMPL_CONTRACT, vault_abi: StakingERC20Abi, staking_token_abi: erc20Abi, staking_symbol: "kMPL", precision: 9, reward_token_precision: 18, name: "Pioneer Fund Vault II: kMPL" },
  PIONEER1A: { vault: CONTRACT_ADDRESSES.PIONEER1_CONTRACT, staking_token: CONTRACT_ADDRESSES.NFT1_CONTRACT, vault_abi: StakingERC721Abi, staking_token_abi: erc721Abi, staking_symbol: "ZNFT", precision: 0, reward_token_precision: 18, name: "Pioneer Fund Vault I: ZEUS" },
  PIONEER1B: { vault: CONTRACT_ADDRESSES.PIONEER1_CONTRACT, staking_token: CONTRACT_ADDRESSES.NFT2_CONTRACT, vault_abi: StakingERC721Abi, staking_token_abi: erc721Abi, staking_symbol: "ANFT", precision: 0, reward_token_precision: 18, name: "Pioneer Fund Vault I: APOLLO" },
  PIONEER3: { vault: CONTRACT_ADDRESSES.PIONEER3_CONTRACT, staking_token: CONTRACT_ADDRESSES.Univ3_KMPL_ETH_CONTRACT, vault_abi: StakingERC20Abi, staking_token_abi: erc20Abi, staking_symbol: "UniswapV2", precision: 18, reward_token_precision: 18, name: "Pioneer Fund Vault III: KMPL/ETH" },
};

export const vaultTypeFromID = [VaultType.AMPLESENSE, VaultType.LPSTAKING, VaultType.PIONEER2, VaultType.PIONEER1A, VaultType.PIONEER1B, VaultType.PIONEER3];

export class VaultContract {
  state = { web3: null, type: VaultType.AMPLESENSE, account: "", stakable: [] };

  constructor(vaultType, web3, account) {
    // super();
    this.state = { web3: web3, type: vaultType, account: account, stakable: [] };
  }

  getStakingTokenPrice(kmpl_price, ampl_price, nft1_price, nft2_price, eefi_eth_price, kmpl_eefi_price) {
    switch (this.state.type) {
      case VaultType.AMPLESENSE:
        return ampl_price;
      case VaultType.PIONEER1A:
        return nft1_price;
      case VaultType.PIONEER1B:
        return nft2_price;
      case VaultType.PIONEER2:
        return kmpl_price;
      case VaultType.PIONEER3:
        return kmpl_eefi_price;
      case VaultType.LPSTAKING:
        return eefi_eth_price;
      default:
        return "0";
    }
  }

  getRewardTokenPrice(eefi_price) {
    switch (this.state.type) {
      case VaultType.AMPLESENSE:
        return eefi_price;
      case VaultType.PIONEER1A:
        return "0"; // no token reward
      case VaultType.PIONEER1B:
        return "0"; // no token reward
      case VaultType.PIONEER2:
        return eefi_price;
      case VaultType.PIONEER3:
        return eefi_price;
      case VaultType.LPSTAKING:
        return eefi_price;
      default:
        return "0";
    }
  }

  vaultName() {
    return this.state.type.name;
  }

  stakingTokenPrecision() {
    return this.state.type.precision;
  }

  stakingTokenPrecisionName() {
    if (this.state.type.precision === 0) return "wei";
    if (this.state.type.precision === 1) return "wei";
    if (this.state.type.precision === 9) return "gwei";
    return "ether";
  }

  maxStakingTokenDisplayPrecision() {
    switch (this.state.type) {
      case VaultType.AMPLESENSE:
        return 3;
      case VaultType.PIONEER1A:
        return 0;
      case VaultType.PIONEER1B:
        return 0;
      case VaultType.PIONEER2:
        return 3;
      case VaultType.PIONEER3:
        return 3;
      case VaultType.LPSTAKING:
        return 9;
      default:
        return 0;
    }
  }

  rewardTokenPrecision() {
    return this.state.type.reward_token_precision;
  }

  rewardTokenPrecisionName() {
    if (this.state.type.reward_token_precision === 9) return "gwei";
    return "ether";
  }

  stakingTokenSymbol() {
    return this.state.type.staking_symbol;
  }

  tokenImagePath() {
    return this.state.type.path;
  }

  allowance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.isApprovedForAll(this.state.account, CONTRACT_ADDRESSES.PIONEER1_CONTRACT).call();
    } else {
      return contract.methods.allowance(this.state.account, this.state.type.vault).call();
    }
  }

  stakingTokenBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    return contract.methods.balanceOf(this.state.account).call();
  }

  totalStaked() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.methods.totalStaked().call();
  }

  stakedTokenTotalBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.balanceOf(this.state.account).call();
    } else if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return new Promise((resolve, reject) => {
        contract.methods
          .totalTokenStakedFor(this.state.account)
          .call({ from: this.state.account })
          .then((result) => {
            resolve(this.state.type === VaultType.PIONEER1A ? result.tokenA : result.tokenB);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      return contract.methods.totalStakedFor(this.state.account).call();
    }
  }

  stakedTokenClaimableBalance() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.totalClaimableBy(this.state.account).call();
    } else if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return new Promise((resolve, reject) => {
        contract.methods
          .totalTokenStakedFor(this.state.account)
          .call({ from: this.state.account })
          .then((result) => {
            resolve(this.state.type === VaultType.PIONEER1A ? result.tokenA : result.tokenB);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      return contract.methods.totalStakedFor(this.state.account).call();
    }
  }

  approve() {
    const contract = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
    if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return contract.methods.setApprovalForAll(CONTRACT_ADDRESSES.PIONEER1_CONTRACT, true).send({ from: this.state.account });
    } else {
      return contract.methods.approve(this.state.type.vault, "99999999999999999999999999999999999999999").send({ from: this.state.account });
    }
  }

  getValueWei(amount) {
    if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      return new this.state.web3.utils.BN(amount);
    } else {
      return new this.state.web3.utils.BN(this.state.web3.utils.toWei(amount, this.stakingTokenPrecisionName()));
    }
  }

  async getStakableNFTTokens() {
    return new Promise((resolve, reject) => {
      if (this.state.type !== VaultType.PIONEER1A && this.state.type !== VaultType.PIONEER1B) resolve([]); // no stakable nfts to compute for the other vaults
      //build owned tokens list
      let stakable = [];
      const token = new this.state.web3.eth.Contract(this.state.type.staking_token_abi.abi, this.state.type.staking_token);
      token
        .getPastEvents("Transfer", { fromBlock: 0, filter: { to: this.state.account } })
        .then((transfers) => {
          let ids = transfers.map((transfer) => {
            return transfer.returnValues.tokenId;
          });
          let ownership_promises = ids.map((id) => {
            return token.methods.ownerOf(id).call();
          });
          Promise.all(ownership_promises)
            .then((ownerships) => {
              ids.map((id, index) => {
                if (ownerships[index] === this.state.account) {
                  stakable.push(id);
                }
              });
              this.state.stakable = stakable;
              console.log(this.state.stakable);
              resolve(stakable);
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }

  stake(amount) {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.makeDeposit(amount.toString()).send({ from: this.state.account });
    } else if (this.state.type === VaultType.PIONEER1A || this.state.type === VaultType.PIONEER1B) {
      const to_stake = this.state.stakable.slice(0, Math.min(amount, this.state.stakable.length));
      return contract.methods.stake(to_stake, this.state.type.staking_token === CONTRACT_ADDRESSES.NFT1_CONTRACT).send({ from: this.state.account });
    } else {
      return contract.methods.stake(amount.toString(), "0x").send({ from: this.state.account });
    }
  }

  unstake(amount) {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.withdrawAMPL(amount.toString(), amount.toString()).send({ from: this.state.account });
    } else if (this.state.type === VaultType.PIONEER1A) {
      return contract.methods.unstake(amount.toString(), true).send({ from: this.state.account });
    } else if (this.state.type === VaultType.PIONEER1B) {
      return contract.methods.unstake(amount.toString(), false).send({ from: this.state.account });
    } else {
      return contract.methods.unstake(amount.toString(), "0x").send({ from: this.state.account });
    }
  }

  claim() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.methods.claim().send({ from: this.state.account });
    } else {
      return contract.methods.withdraw("0").send({ from: this.state.account });
    }
  }

  getReward() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.methods.getReward(this.state.account).call();
  }

  getDepositEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.getPastEvents("Deposit", { fromBlock: 0, filter: { account: this.state.account } });
    } else {
      return contract.getPastEvents("Staked", { fromBlock: 0, filter: { addr: this.state.account, account: this.state.account } });
    }
  }

  getWithdrawalEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    if (this.state.type === VaultType.AMPLESENSE) {
      return contract.getPastEvents("Withdrawal", { fromBlock: 0, filter: { account: this.state.account } });
    } else {
      return contract.getPastEvents("Unstaked", { fromBlock: 0, filter: { addr: this.state.account, account: this.state.account } });
    }
  }

  getClaimEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.getPastEvents("Claimed", { fromBlock: 0, filter: { account: this.state.account } });
  }

  getStakeChangedEvent() {
    const contract = new this.state.web3.eth.Contract(this.state.type.vault_abi.abi, this.state.type.vault);
    return contract.getPastEvents("StakeChanged", { fromBlock: 0 });
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

  componentDidMount() {
    const { web3, account, vault_type } = this.props;

    const that = this;
    this.timer = setInterval(this.pull, 5000);
    this.pull();
    this.props.dispatch(fetchDeposits(vaultTypeFromID[vault_type], web3, account));
    this.props.dispatch(fetchWithdrawals(vaultTypeFromID[vault_type], web3, account));
    this.props.dispatch(fetchClaimings(vaultTypeFromID[vault_type], web3, account));
    this.props.dispatch(fetchAllowance(vaultTypeFromID[vault_type], web3, account));
    this.props.dispatch(fetchTotalBalances(web3, account));
    this.props.dispatch(fetchTVLHistory(web3, account));
    // uncomment if you need to access stake nft list
    //this.props.dispatch(fetchStakableNFTs(vaultTypeFromID[vault_type], web3, account));

    //get kMPL price
    axios
      .get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${CONTRACT_ADDRESSES.KMPL_CONTRACT}`)
      .then((resp) => {
        const kMPLPrice = resp.data.market_data.current_price.usd;
        this.props.dispatch(fetchKMPLPrice(kMPLPrice,resp.data.market_data.price_change_24h));
      })
      .catch((e) => {
        // in case of failure set price to $50
        this.props.dispatch(fetchKMPLPrice(50, "0"));
      });

    //get kMPL price
    axios
      .get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${CONTRACT_ADDRESSES.EEFI_CONTRACT}`)
      .then((resp) => {
        const eefiPrice = resp.data.market_data.current_price.usd;
        this.props.dispatch(fetchEEFIPrice(eefiPrice, resp.data.market_data.price_change_24h));
      })
      .catch((e) => {
        // in case of failure set price to $100
        this.props.dispatch(fetchEEFIPrice(100, "0"));
      });

    //get AMPL price
    axios
      .get(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${CONTRACT_ADDRESSES.AMPLE_CONTRACT}`)
      .then((resp) => {
        const amplPrice = resp.data.market_data.current_price.usd;
        this.props.dispatch(fetchAMPLPrice(amplPrice,resp.data.market_data.price_change_24h));
      })
      .catch((e) => {
        // in case of failure set price to $500
        this.props.dispatch(fetchAMPLPrice(500, "0"));
      });

    //get ETH price
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
      .then((resp) => {
        const ethPrice = resp.data.ethereum.usd;
        this.props.dispatch(fetchETHPrice(ethPrice, "0"));
      })
      .catch((e) => {
        // in case of failure set price to $4000
        this.props.dispatch(fetchETHPrice(4000, "0"));
      });

    //get ZNFT price
    axios
      .get(`https://api.opensea.io/api/v1/collection/zeus-kgeyser-pioneer-nft/stats`)
      .then((resp) => {
        this.props.dispatch(fetchZNFTPrice(resp.data.stats.floor_price));
      })
      .catch((e) => {
        this.props.dispatch(fetchZNFTPrice(0));
      });

    //get ANFT price
    axios
      .get(`https://api.opensea.io/api/v1/collection/apollo-kgeyser-pioneer-nft-v2/stats`)
      .then((resp) => {
        this.props.dispatch(fetchANFTPrice(resp.data.stats.floor_price));
      })
      .catch((e) => {
        this.props.dispatch(fetchANFTPrice(0));
      });
  }

  render() {
    return <div />;
  }

  pull = () => {
    const { web3, account, vault_type } = this.props;
    // const contract = new VaultContract(vaultTypeFromID[vault_type], web3, account);

    this.props.dispatch(fetchStakingTokenBalance(vaultTypeFromID[vault_type], web3, account));

    this.props.dispatch(fetchStakedBalance(vaultTypeFromID[vault_type], web3, account));

    this.props.dispatch(fetchClaimableBalance(vaultTypeFromID[vault_type], web3, account));

    this.props.dispatch(fetchTotalStaked(vaultTypeFromID[vault_type], web3, account));

    this.props.dispatch(fetchReward(vaultTypeFromID[vault_type], web3, account));

    this.props.dispatch(fetchAllowance(vaultTypeFromID[vault_type], web3, account));

    // get pas prices
    axios
      .get("https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=db84e1509032bc4cc4f96d1c8791d92b667d28adc606bda9480c9a616310")
      .then((ethGasStationResponse) => {
        const ethGasStationData = ethGasStationResponse.data;
        this.props.dispatch(fetchGasPriceFastest(Math.floor(ethGasStationData.fastest / 10)));
        this.props.dispatch(fetchGasPriceFast(Math.floor(Math.floor(ethGasStationData.fast / 10))));
        this.props.dispatch(fetchGasPriceAverage(Math.floor(ethGasStationData.average / 10)));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function mapStateToProps(store) {
  return {
    web3: store.auth.web3,
    account: store.auth.account,
    deposits: store.blockchain.deposits,
    withdrawals: store.blockchain.withdrawals,
    vault_type: store.blockchain.vault_type,
  };
}

export default withRouter(connect(mapStateToProps)(BlockchainUpdater));
