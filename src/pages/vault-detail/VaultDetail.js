import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Table } from "reactstrap";

import usersImg from "../../images/usersImg.svg";
import smileImg from "../../images/smileImg.svg";
import totalSale from "../../images/total-sale.svg";
import orders from "../../images/orders.svg";
import stocksImg from "../../images/stocks.svg";
import stocksDownImg from "../../images/stocksDown.svg";
import { chartData } from "./chartsMock";
import  tokenDetailedData  from "./tokenDetailedData.json";
import Widget from "../../components/Widget";
import s from "./VaultDetail.module.scss";
import ApexChart from "react-apexcharts";

//tokens
import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";


import {
        fetchKMPLPrice, 

        fetchAMPLBalance,
        checkAVAllowance, 
        makeAVApproval, 
        makeAVDeposit, 
        makeAVWithdrawal, 
        fetchAVDeposits,

        fetchKMPLBalance,
        checkKVAllowance, 
        makeKVApproval, 
        makeKVDeposit, 
        makeKVWithdrawal, 
        fetchKVDeposits,


      } from "../../actions/blockchain";

import {
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


 const AMPLE_SENSE_VAULT = 0
 const  EEFI_ETH_VAULT = 1
 const  KMPL_VAULT = 2
 const KMPL_ETH_VAULT = 3


var BigNumber = require('bignumber.js');

const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const erc20Abi = require("../../contracts/ERC20.json");
const stakingERC20Abi = require("../../contracts/StakingERC20.json");

const { CONTRACT_ADDRESSES } = require("../../components/Blockchain/Updater.js");

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


   amountToDeposit= "0";
   amountToWithdraw= "0";

   getId() {
        const {match} = this.props;
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

  }

  state = {
    orderValue: { ...chartData.apex.column, ...orderValueOverride },
    convertionRate: { ...chartData.apex.column, ...convertionRateOverride },
    area: { ...area },
    area2: { ...area2 },
    splineArea: { ...splineArea },
  };

 handleChangeToDeposit(evt) {
    this.amountToDeposit = evt.target.value;
    this.setState({
      amountToDeposit: evt.target.value
    })
    //console.log('value changed to', this.amountToDeposit)
  }

 handleChangeToWithdraw(evt) {
    this.amountToWithdraw = evt.target.value;
    this.setState({
      amountToWithdraw: evt.target.value
    })
    //console.log('value changed to', this.amountToDeposit)
  }
 calculateAmountToDeposit(evt) {

   if (this.getId() == AMPLE_SENSE_VAULT) {
       const { ampl_balance } = this.props;
       this.amountToDeposit = parseFloat(ampl_balance * evt.target.value).toString() 
       this.setState({
          amountToDeposit: this.amountToDeposit
        })
      }

   if (this.getId() == KMPL_VAULT) {
       const { kmpl_balance } = this.props;
       this.amountToDeposit = parseFloat(kmpl_balance * evt.target.value).toString() 
       this.setState({
          amountToDeposit: this.amountToDeposit
        })
      }

  }

calculateAmountToWithdraw(evt) {

 if (this.getId() == AMPLE_SENSE_VAULT) {

     const { ampl_withdraw } = this.props;
     this.amountToWithdraw = parseFloat(ampl_withdraw * evt.target.value) 
     this.setState({
        amountToWithdraw: this.amountToWithdraw
      })
 }

 if (this.getId() == KMPL_VAULT) {

     const { kmpl_withdraw } = this.props;
     this.amountToWithdraw = parseFloat(kmpl_withdraw * evt.target.value) 
     this.setState({
        amountToWithdraw: this.amountToWithdraw
      })
 }

}
  componentDidMount() {
    window.addEventListener("resize", this.forceUpdate.bind(this));
    this.setState({
      tokenDetailedDataList: tokenDetailedData
    })

  }

  forceUpdate() {
    return this.setState({})
  }

  doDeposit() {
   const {account, web3} = this.props;
   const value = new web3.utils.BN(Math.floor(this.amountToDeposit));

    try {
    if(account) {


       if (this.getId() == AMPLE_SENSE_VAULT) {

          const valueWei = value.mul(new web3.utils.BN(10**9));
          const ampl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
          ampl.methods.allowance(account, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT).call().then(allowance => {
            const all = new web3.utils.BN(allowance.toString());
            this.props.dispatch(checkAVAllowance(all));
            const to_allow = new web3.utils.BN(valueWei > all? valueWei.sub(all) : "0");
            if(to_allow > 0) {
              const ampl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
              ampl.methods.approve(CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT, to_allow.toString()).send({from: account}).once('transactionHash', hash_allowance => {
                //deposit AMPL
                const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
                ampleSenseVault.methods.makeDeposit(valueWei.toString()).send({from: account}).once('transactionHash', hash_deposit => {
                  this.props.dispatch(makeAVDeposit(hash_deposit, hash_allowance));
                });
              });
            } else {
                //deposit AMPL
                const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
                const tx = ampleSenseVault.methods.makeDeposit(valueWei.toString()).send({from: account}).once('transactionHash', hash_deposit => {
                  this.props.dispatch(makeAVDeposit(hash_deposit, null));
                });
            }
          })
        }

      if (this.getId() == KMPL_VAULT) {

          const valueWei = value.mul(new web3.utils.BN(10**9));
         // const kmpl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
 
         const kmpl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.KMPL_CONTRACT);
         kmpl.methods.allowance(account, CONTRACT_ADDRESSES.PIONEER2_CONTRACT).call().then(allowance => {
            const all = new web3.utils.BN(allowance.toString());
            this.props.dispatch(checkKVAllowance(all));
            const to_allow = new web3.utils.BN(valueWei > all? valueWei.sub(all) : "0");
            if(to_allow > 0) {
              const kmpl = new web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.KMPL_CONTRACT);
              kmpl.methods.approve(CONTRACT_ADDRESSES.PIONEER2_CONTRACT, to_allow.toString()).send({from: account}).once('transactionHash', hash_allowance => {
                //deposit AMPL
                const pioneer2Vault = new web3.eth.Contract(stakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
                pioneer2Vault.methods.stake(valueWei.toString(),'0x').send({from: account}).once('transactionHash', hash_deposit => {
                  this.props.dispatch(makeKVDeposit(hash_deposit, hash_allowance));
                });
              });
            } else {
                //deposit AMPL
                const pioneer2Vault = new web3.eth.Contract(stakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
                const tx = pioneer2Vault.methods.stake(valueWei.toString(), '0x').send({from: account}).once('transactionHash', hash_deposit => {
                  this.props.dispatch(makeKVDeposit(hash_deposit, null));
                });
            }
          })
        }


      }
      else {

        window.alert('Please connect to your wallet');
      }
    } catch(error) {
      console.log('calling makeDeposit failed!', error)
    }
  }


  doWithdraw() {
   const value = this.amountToWithdraw;
   const {account, web3} = this.props;

    try {
    if(account) {
        //withdraw AMPL

       if (this.getId() == AMPLE_SENSE_VAULT) {

        const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
        const tx = ampleSenseVault.methods.withdraw(value).send({from: account});
        this.props.dispatch(makeAVWithdrawal(tx));
      }

       if (this.getId() == KMPL_VAULT) {

        const pioneer2Vault = new web3.eth.Contract(stakingERC20Abi.abi, CONTRACT_ADDRESSES.PIONEER2_CONTRACT);
        const tx = pioneer2Vault.methods.withdraw(value).send({from: account});
        this.props.dispatch(makeKVWithdrawal(tx));
      }

      }
      else {

        window.alert('Please connect to your wallet');
      }
    } catch(error) {
      console.log('calling withdraw AMPL failed!', error)
    }
  }

  render() {

    var tokenId = 0;
    const { 
      kmpl_price,
      account,
      web3,
      ampl_balance,
      ampl_withdraw,
      ampl_eth_reward,
      ampl_token_reward,
      AVdeposits,
      AVwithdrawals,
      kmpl_balance,
      kmpl_withdraw,
      kmpl_eth_reward,
      kmpl_token_reward,
      KVdeposits,
      KVwithdrawals

    } = this.props;

     var balance_formatted = 0;
     var withdraw_formatted = 0;
     var eth_reward_formatted = 0;
     var token_reward_formatted = 0;

   if (this.getId() == AMPLE_SENSE_VAULT) {
       balance_formatted = ampl_balance.toLocaleString(undefined,{ minimumFractionDigits: 2 });
       withdraw_formatted = ampl_withdraw.toLocaleString(undefined,{ minimumFractionDigits: 2 });
       eth_reward_formatted = ampl_eth_reward ? ampl_eth_reward.toLocaleString(undefined,{ minimumFractionDigits: 2 }) : 0;
       token_reward_formatted = ampl_token_reward ? ampl_token_reward.toLocaleString(undefined,{ minimumFractionDigits: 2 }) : 0;
    }
  if (this.getId() == KMPL_VAULT) {
       balance_formatted = kmpl_balance.toLocaleString(undefined,{ minimumFractionDigits: 2 });
       withdraw_formatted = kmpl_withdraw.toLocaleString(undefined,{ minimumFractionDigits: 2 });
       eth_reward_formatted = kmpl_eth_reward ? kmpl_eth_reward.toLocaleString(undefined,{ minimumFractionDigits: 2 }) : 0;
       token_reward_formatted = kmpl_token_reward ? kmpl_token_reward.toLocaleString(undefined,{ minimumFractionDigits: 2 }) : 0;
    }

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
      return (<div className={s.root}>
        <h2>
        {tokenDetailedData[tokenId].title}
        </h2>
        <h3>Connect your wallet to view vault details</h3>
        </div>)
    }
    //console.log('tokenDetailedData', tokenDetailedData[tokenId].title, tokenDetailedData.length);
    return (

      <div className={s.root}>
        <h2>
        {tokenDetailedData[tokenId].title}
        </h2>

        <Row>

         {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>
                {tokenDetailedData[tokenId].token_name} Wallet Balance: {balance_formatted}  {tokenDetailedData[tokenId].token_name}</p>} 
              >
                <div>
                 <FormGroup>
                  <Label for="bar"> Amount to Deposit</Label>
                   <Table className="table-hover " responsive>
                    <thead>
                      <tr>
                        <th key={0}  scope="col" className={"pl-0"}>
                            <InputGroup>
                              <Input id="amountToDeposit" onChange={this.handleChangeToDeposit} value={this.amountToDeposit} type="text" id="bar" />
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
                    <Button color="default" size="lg" align="center" className="mb-md mr-sm"  onClick={this.doDeposit}>Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */ }
            <Col md={6} sm={12} xs={12}>
                    <Widget
                title={<p style={{ fontWeight: 700 }}>
                {tokenDetailedData[tokenId].token_name} Available to Withdraw: {withdraw_formatted} {tokenDetailedData[tokenId].token_name}</p>} 
              >
                <div>
                   <FormGroup>
                     <Label for="bar"> Amount to Deposit </Label>
                       <Table className="table-hover " responsive>
                        <thead>
                          <tr>
                            <th key={0}  scope="col" className={"pl-0"}>

                                <InputGroup>
                                  <Input id="amountToWithdraw" onChange={this.handleChangeToWithdraw} value={this.amountToWithdraw} type="text" id="bar" />

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
                  Unlocked AMPL
                </p>
                <p className={"d-flex align-items-center "}>
                  <Button color="default" size="lg" className="mb-md mr-sm" onClick={this.doWithdraw}>Withdraw</Button>
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
                      &nbsp;Staked {tokenDetailedData[tokenId].token_name}
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
                        &nbsp;{withdraw_formatted} {tokenDetailedData[tokenId].token_name}
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
                       &nbsp;{eth_reward_formatted} {tokenDetailedData[tokenId].rewards_token_1}</span>     
                      <p>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        &nbsp;{token_reward_formatted} {tokenDetailedData[tokenId].rewards_token_2}</span>  
                        </p>
                    </h4>
                      <p>
                        <Button color="primary" className="mb-md mr-md">Claim</Button>
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

                  {AVdeposits.map(deposit => {
                    return <tr key={deposit.transactionHash}>
                      <td className="fw-normal pl-0 fw-thin">

                        &nbsp;{new Date(deposit.timestamp * 1000).toUTCString()}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        &nbsp;{(deposit.returnValues.amount / 10**tokenDetailedData[tokenId].precision).toLocaleString(undefined,{ minimumFractionDigits: 2 })} {tokenDetailedData[tokenId].token_name}
                      </td>
                      <td className={"pl-0 fw-thin"}>
                      &nbsp;{deposit.transactionHash.substr(0,8)+"..."}   <a href={"https://www.etherscan.io/tx/" + deposit.transactionHash}  target="_blank">Link</a></td>
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
    ampl_eth_reward: store.blockchain.ampl_eth_reward,
    ampl_token_reward: store.blockchain.ampl_token_reward,
    kmpl_price: store.blockchain.kmpl_price,
    AVdeposits: store.blockchain.AVdeposits,
    AVwithdrawals: store.blockchain.AVwithdrawals,

    kmpl_balance: store.blockchain.kmpl_balance,
    kmpl_withdraw: store.blockchain.kmpl_withdraw,
    kmpl_eth_reward: store.blockchain.kmpl_eth_reward,
    kmpl_token_reward: store.blockchain.kmpl_token_reward,
    KVdeposits: store.blockchain.KVdeposits,
    KVwithdrawals: store.blockchain.KVwithdrawals

  };
}


export default withRouter(connect(mapStateToProps)(VaultDetail));

