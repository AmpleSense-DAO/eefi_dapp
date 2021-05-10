import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table } from "reactstrap";

import { chartData } from "./chartsMock";
import  tokenDetailedData  from "./tokenDetailedData.json";
import Widget from "../../components/Widget";
import s from "./VaultDetail.module.scss";

//tokens
// import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
// import p3 from "../../images/tokens/kappa_logo_kmpl.png";
// import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";

import {setVaultType, checkAllowance, makeDeposit, makeWithdrawal, makeClaim } from "../../actions/blockchain";

import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import {
  Button,
  ButtonGroup,
} from 'reactstrap';

// var BigNumber = require('bignumber.js');

// var vaultType;

// const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
// const erc20Abi = require("../../contracts/ERC20.json");
// const { CONTRACT_ADDRESSES, VaultContract, VaultType } = require("../../components/Blockchain/Updater.js");
const { VaultContract, VaultType } = require("../../components/Blockchain/Updater.js");

const orderValueOverride = {
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 173, 1, 0.3)"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: -9,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const convertionRateOverride = {
  series: [
    {
      data: [280, 300, 170, 200, 230, 190, 260, 100, 290, 280, 300, 250, 240],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(246, 121, 93, 0.3)"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        distributed: true,
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: -8,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const area = {
  series: [
    {
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(252, 215, 206, .25)"]
    },
    colors: ["rgba(246, 121, 93)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const area2 = {
  series: [
    {
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ],
  options: {
    stroke: {
      show: true,
      curve: "smooth",
      width: 3,
    },
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'solid',
      colors: ["rgba(255, 230, 179, .25)"]
    },
    colors: ["rgba(255, 173, 1)"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    grid: {
      padding: {
        left: 5,
        right: 0,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  },
};

const splineArea = {
  series: [
    {
      name: "Income",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Outcome",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      colors: ["rgba(255, 205, 101, .2)", 'rgba(0,0,0,0)'],
      type: 'solid'
    },
    colors: ["#FFBF69", "#323232"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      labels: {
        style: {
          colors: [
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
          ],
          fontWeight: 300,
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
      labels: {
        style: {
          colors: [
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
            "rgba(18, 4, 0, .5)",
          ],
          fontWeight: 300,
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },
};

class VaultDetail extends React.Component {

   getId = () => {
        const {match} = this.props;
        if(!match.params.id) {
          return this.props.forcedId;
        }
        return (parseInt(match.params.id) );
   }

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this)
    this.doDeposit = this.doDeposit.bind(this)
    this.doWithdraw = this.doWithdraw.bind(this)
    this.handleChangeToDeposit = this.handleChangeToDeposit.bind(this)
    this.calculateAmountToDeposit = this.calculateAmountToDeposit.bind(this)
    this.handleChangeToWithdraw = this.handleChangeToWithdraw.bind(this)
    this.calculateAmountToWithdraw = this.calculateAmountToWithdraw.bind(this)
    this.doClaim = this.doClaim.bind(this);
  }

  state = {
    orderValue: { ...chartData.apex.column, ...orderValueOverride },
    convertionRate: { ...chartData.apex.column, ...convertionRateOverride },
    area: { ...area },
    area2: { ...area2 },
    splineArea: { ...splineArea },
    amountToDeposit: "0",
    amountToWithdraw: "0"
  };

 handleChangeToDeposit(evt) {
    this.setState({
      amountToDeposit: evt.target.value
    })
    //console.log('value changed to', this.amountToDeposit)
  }

 handleChangeToWithdraw(evt) {
    this.setState({
      amountToWithdraw: evt.target.value
    })
    //console.log('value changed to', this.amountToDeposit)
  }
 calculateAmountToDeposit(evt) {

   const { ampl_balance, account, web3 } = this.props;
   const precision = (new VaultContract(this.getVaultType(), web3, account)).stakingTokenPrecision();
   this.setState({
      amountToDeposit: parseFloat(ampl_balance / 10**precision * evt.target.value).toString()
    })
  }

  calculateAmountToWithdraw(evt) {
   const { claimable, account, web3 } = this.props;
   const precision = (new VaultContract(this.getVaultType(), web3, account)).stakingTokenPrecision();
   this.setState({
      amountToWithdraw: parseFloat(claimable / 10**precision * evt.target.value).toString()
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.forceUpdate.bind(this));

    this.props.dispatch(setVaultType(this.getId()));
    console.log("VAULT TYPE SET TO ", this.getId())
    this.setState({
      tokenDetailedDataList: tokenDetailedData
    })

  }

  forceUpdate() {
    return this.setState({})
  }

  doClaim() {
    const {account, web3} = this.props;

    const contract = new VaultContract(this.getVaultType(), web3, account);

    contract.claim().once('transactionHash', hash => {
      this.props.dispatch(makeClaim(hash, false));
    }).then(receipt => {
      this.props.dispatch(makeClaim(null, true));
    }).catch(err => {
      console.log(err);
    });
  }

  doDeposit() {
    const {account, web3} = this.props;
    const value = new web3.utils.BN(Math.floor(parseFloat(this.state.amountToDeposit) * 100));
    // const contract = new VaultContract(this.getVaultType(), web3, account);
    // // const precision = contract.stakingTokenPrecision();
    const valueWei = value.mul(new web3.utils.BN(10**7));
    const current_time = Math.floor(Date.now()/1000);
    this.props.dispatch(makeDeposit(this.getVaultType(), web3, account, valueWei, {id: current_time, transactionHash: null, allowanceHash: null, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false, allowanceMined: false}));
    // contract.allowance().then(allowance => {
    //   const all = new web3.utils.BN(allowance.toString());
    //   this.props.dispatch(checkAllowance(all));
    //   const to_allow = new web3.utils.BN(valueWei.gt(all)? valueWei.sub(all) : "0");
    //   if(to_allow > 0) {
    //     contract.approve(valueWei).once('transactionHash', hash_allowance => {
    //       contract.stake(valueWei.toString()).once('transactionHash', hash_deposit => {
    //         this.props.dispatch(makeDeposit({id: current_time, transactionHash: hash_deposit, allowanceHash: hash_allowance, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false, allowanceMined: false}));
    //       }).then(receipt => {
    //         //after it's mined, update
    //         this.props.dispatch(makeDeposit({id: current_time, mined: true}));
    //       });
    //     }).then(receipt => {
    //       //after it's mined, update
    //       this.props.dispatch(makeDeposit({id: current_time, allowanceMined: true}));
    //     });
    //   } else {
    //       contract.stake(valueWei).once('transactionHash', hash_deposit => {
    //         this.props.dispatch(makeDeposit({id: current_time, transactionHash: hash_deposit, allowanceHash: null}));
    //       }).then(receipt => {
    //         //after it's mined, update
    //         this.props.dispatch(makeDeposit({id: current_time, mined: true}));
    //       })
    //   }
    // });
  }


  getVaultType() {
    switch(this.getId()) {
      case 0:
        return VaultType.AMPLESENSE;
      case 1:
        return VaultType.PIONEER1A;
      case 2:
        return VaultType.PIONEER2;
      case 3:
        return VaultType.LPSTAKING;
      case 4:
        return VaultType.PIONEER1B;
      default:
        return VaultType.AMPLESENSE;
    }
  }

  doWithdraw() {
    const {account, web3} = this.props;
    const value = new web3.utils.BN(Math.floor(parseFloat(this.state.amountToWithdraw) * 100));
    // const contract = new VaultContract(this.getVaultType(), web3, account);
    // // const precision = contract.stakingTokenPrecision();
    const valueWei = value.mul(new web3.utils.BN(10**7));
    const current_time = Math.floor(Date.now()/1000);
    this.props.dispatch(makeWithdrawal(this.getVaultType(), web3, account, valueWei, {id: current_time, transactionHash: null, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false}));
    // contract.unstake(valueWei).once('transactionHash', hash => {
    //   //got tx
    //   this.props.dispatch(makeWithdrawal({id: current_time, transactionHash: hash}));
    // }).then(receipt => {
    //   this.props.dispatch(makeWithdrawal({id: current_time, mined: true}));
    // });
  }

  render() {
    var tokenId = 0;
    const {
      // vault_type,
      ampl_balance,
      ampl_withdraw,
      claimable,
      // kmpl_price,
      reward,
      account,
      web3,
      deposits,
      withdrawals
    } = this.props;

    const contract = new VaultContract(this.getVaultType(), web3, account);

    if (this.getId()) {
          tokenId = this.getId();
        //  console.log('VAULT ID: ', this.getId());
    } else {
          tokenId = 0;
        //  console.log('VAULT ID: no vault id');
    }

    // check that token id is between 0 and max tokens from the data file, otherwise return 0 - AMPL
    if (tokenId >= tokenDetailedData.length || tokenId < 0) {
      tokenId = 0;
    }

    if(!account) {
      return (
      <div className={s.root}>
        <h2>
          {contract.vaultName()}
        </h2>
        <h3>Connect your wallet to view vault details</h3>
      </div>)
    }
    const ampl_balance_formatted = (new web3.utils.BN(ampl_balance).toNumber() / 10**9).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    const claimable_formatted = (new web3.utils.BN(claimable).toNumber() / 10**9).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    const ampl_withdraw_formatted = (new web3.utils.BN(ampl_withdraw).toNumber() / 10**9).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    const ampl_eth_reward_formatted = (new web3.utils.BN(reward.eth).toNumber() / 10**18).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    const ampl_token_reward_formatted =(new web3.utils.BN(reward.token).toNumber() / 10**9).toLocaleString(undefined,{ minimumFractionDigits: 2 });
    return (

      <div className={s.root}>
        <h2>
        {contract.vaultName()}
        </h2>

        <Row>

         {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>
                {contract.stakingTokenSymbol()} Wallet Balance: {ampl_balance_formatted}  {contract.stakingTokenSymbol()}</p>}
              >
                <div>
                 <FormGroup>
                  <Label for="bar"> Amount to Deposit</Label>
                   <Table className="table-hover " responsive>
                    <thead>
                      <tr>
                        <th key={0}  scope="col" className={"pl-0"}>
                            <InputGroup>
                              <Input id="amountToDeposit" onChange={this.handleChangeToDeposit} value={this.state.amountToDeposit} type="text" id="bar" />
                              <InputGroupAddon addonType="append">
                                <ButtonGroup>
                                  <Button color="ample1" onClick={this.calculateAmountToDeposit} value={0.25}><i className="fa " />25%</Button>
                                  <Button color="ample2" onClick={this.calculateAmountToDeposit} value={0.50}><i className="fa " />50%</Button>
                                  <Button color="ample3" onClick={this.calculateAmountToDeposit} value={0.75}><i className="fa " />75%</Button>
                                  <Button color="ample4" onClick={this.calculateAmountToDeposit} value={1.0}><i className="fa " />100%</Button>
                                </ButtonGroup>
                              </InputGroupAddon>
                            </InputGroup>
                        </th>
                      </tr>
                    </thead>
                    </Table>
                 </FormGroup>
                  <p className="fs-mini text-muted">
                    New deposits locked for 90 days.
                  </p>
                  <p className={"d-flex align-items-center "} align="center">
                    <Button color="default" size="lg" align="center" className="mb-md mr-sm" disabled={this.state.amountToDeposit === "0"}  onClick={this.doDeposit}>Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */ }
            <Col md={6} sm={12} xs={12}>
                    <Widget
                title={<p style={{ fontWeight: 700 }}>
                {contract.stakingTokenSymbol()} Available to Withdraw: {claimable_formatted} {contract.stakingTokenSymbol()}</p>}
              >
                <div>
                   <FormGroup>
                    <Label for="bar"> Amount to Withdraw </Label>
                    <Table className="table-hover " responsive>
                      <thead>
                        <tr>
                          <th key={0}  scope="col" className={"pl-0"}>
                            <InputGroup>
                              <Input id="amountToWithdraw" onChange={this.handleChangeToWithdraw} value={this.state.amountToWithdraw} type="text" id="bar" />
                              <InputGroupAddon addonType="append">
                                <ButtonGroup>
                                  <Button color="ample1" onClick={this.calculateAmountToWithdraw} value={0.25}><i className="fa " />25%</Button>
                                  <Button color="ample2" onClick={this.calculateAmountToWithdraw} value={0.50}><i className="fa " />50%</Button>
                                  <Button color="ample3" onClick={this.calculateAmountToWithdraw} value={0.75}><i className="fa " />75%</Button>
                                  <Button color="ample4" onClick={this.calculateAmountToWithdraw} value={1.0}><i className="fa " />100%</Button>
                                </ButtonGroup>
                              </InputGroupAddon>
                            </InputGroup>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                 </FormGroup>

                <p className="fs-mini text-muted">
                  Unlocked {contract.stakingTokenSymbol()}
                </p>
                <p className={"d-flex align-items-center "}>
                  <Button color="default" size="lg" className="mb-md mr-sm" disabled={this.state.amountToWithdraw === "0"} onClick={this.doWithdraw}>Withdraw</Button>
                </p>
              </div>
              </Widget>
            </Col>
        </Row>

       <Row>
          <Col sm={12}>
            <Widget>
              <h3>Your Staked Balance and Rewards</h3>
                <Table className="table-hover table-bordered" responsive>
                <thead>
                  <tr>
                    <th key={0} width="50%"  scope="col" className={"pl-0"}>
                      &nbsp;Staked {contract.stakingTokenSymbol()}
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Rewards
                    </th>
                  </tr>
                </thead>
                <tbody className="text-dark ">
                  <tr>
                    <td className="fw-thin pl-0 fw-thin">
                      <h3>
                        &nbsp;{ampl_withdraw_formatted} {contract.stakingTokenSymbol()}
                        </h3>
                      <h4>APY {tokenDetailedData[tokenId].apy}</h4>
                      <br></br>
                      {tokenDetailedData[tokenId].staked_section_desc_1 ? tokenDetailedData[tokenId].staked_section_desc_1 : null}  
                      <br></br>
                      {tokenDetailedData[tokenId].staked_section_desc_2 ? tokenDetailedData[tokenId].staked_section_desc_2 : null}  
                    </td>

                    <td className={"pl-0 fw-thin"}>
                    <h4>
                      <img height="30" src={p2} alt="" className={"mr-3"} />
                      <span align="right">
                       &nbsp;{ampl_eth_reward_formatted} {tokenDetailedData[tokenId].rewards_token_1}</span>
                      <p>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        &nbsp;{ampl_token_reward_formatted} {tokenDetailedData[tokenId].rewards_token_2}</span>
                        </p>
                    </h4>
                      <p>
                        <Button color="primary" className="mb-md mr-md" disabled={reward.token === "0" && reward.eth === "0"} onClick={this.doClaim}>Claim</Button>
                        {this.props.claim_tx.hash && this.props.claim_tx.hash.substr(0,8)+"..." && <a href={"https://www.etherscan.io/tx/" + this.props.claim_tx.hash}  target="_blank" rel="noopener noreferrer">Link {this.props.claim_tx.mined === false && "(pending)"}</a>}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <br></br>
              <h3>Your Deposit History</h3>
                <Table className="table-hover table-bordered"  responsive>

                <thead>
                  <tr >
                    <th width="50%" key={0} scope="col" className={"pl-0"}>
                      &nbsp;Deposit Date
                    </th>
                    <th width="25%" key={1} scope="col" className={"pl-0"}>
                      &nbsp;Amount
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Tx Link
                    </th>
                  </tr>
                </thead>
                <tbody className="text-dark">

                  {deposits.slice(0).reverse().map(deposit => {
                    return <tr key={deposit.transactionHash}>
                      <td className="fw-normal pl-0 fw-thin">

                        &nbsp;{new Date(deposit.timestamp * 1000).toUTCString()}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        &nbsp;{(deposit.returnValues.amount / 10**tokenDetailedData[tokenId].precision).toLocaleString(undefined,{ minimumFractionDigits: 2 })} {contract.stakingTokenSymbol()}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                      {deposit.allowanceHash && <div>
                        {deposit.allowanceHash.substr(0,8)+"..."}   <a href={"https://www.etherscan.io/tx/" + deposit.allowanceHash}  target="_blank" rel="noopener noreferrer">Link {deposit.allowanceMined === false && "(pending)"}</a>
                        </div>}
                      {deposit.transactionHash && <div>{deposit.transactionHash.substr(0,8)+"..."}   <a href={"https://www.etherscan.io/tx/" + deposit.transactionHash}  target="_blank" rel="noopener noreferrer">Link {deposit.mined === false && "(pending)"}</a></div>}</td>
                    </tr>
                    })
                  }
                </tbody>
              </Table>
              <h3>Your Withdrawal History</h3>
                <Table className="table-hover table-bordered"  responsive>
                <thead>
                  <tr >
                    <th width="50%" key={0} scope="col" className={"pl-0"}>
                      &nbsp;Withdrawal Date
                    </th>
                    <th width="25%" key={1} scope="col" className={"pl-0"}>
                      &nbsp;Amount
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Tx Link
                    </th>
                  </tr>
                </thead>
                <tbody className="text-dark">

                  {withdrawals.slice(0).reverse().map(withdrawal => {
                    return <tr key={withdrawal.transactionHash}>
                      <td className="fw-normal pl-0 fw-thin">

                        &nbsp;{new Date(withdrawal.timestamp * 1000).toUTCString()}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        &nbsp;{(withdrawal.returnValues.amount / 10**tokenDetailedData[tokenId].precision).toLocaleString(undefined,{ minimumFractionDigits: 2 })} {contract.stakingTokenSymbol()}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        {withdrawal.transactionHash && <div>{withdrawal.transactionHash.substr(0,8)+"..."}   <a href={"https://www.etherscan.io/tx/" + withdrawal.transactionHash}  target="_blank" rel="noopener noreferrer">Link {withdrawal.mined === false && "(pending)"}</a></div>}</td>
                    </tr>
                    })
                  }
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

     </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    web3: store.auth.web3,
    account: store.auth.account,
    ampl_balance: store.blockchain.ampl_balance,
    ampl_withdraw: store.blockchain.ampl_withdraw,
    claimable: store.blockchain.claimable,
    kmpl_price: store.blockchain.kmpl_price,
    reward: store.blockchain.reward,
    deposits: store.blockchain.deposits,
    withdrawals: store.blockchain.withdrawals,
    claim_tx: store.blockchain.claim_tx
  };
}


export default withRouter(connect(mapStateToProps)(VaultDetail));

