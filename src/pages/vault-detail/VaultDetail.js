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

import {fetchAMPLBalance, fetchKMPLPrive, checkAllowance, makeApproval, makeDeposit, makeWithdrawal} from "../../actions/blockchain";

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


const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const erc20Abi = require("../../contracts/ERC20.json");

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

   const { ampl_balance } = this.props;
   this.amountToDeposit = parseFloat(ampl_balance * evt.target.value) 
   this.setState({
      amountToDeposit: this.amountToDeposit
    })
  }

calculateAmountToWithdraw(evt) {

   const { ampl_withdraw } = this.props;
   this.amountToWithdraw = parseFloat(ampl_withdraw * evt.target.value) 
   this.setState({
      amountToWithdraw: this.amountToWithdraw
    })
  }
  componentDidMount() {
    window.addEventListener("resize", this.forceUpdate.bind(this))

    this.setState({
      tokenDetailedDataList: tokenDetailedData
    })

  }

  forceUpdate() {
    return this.setState({})
  }

  doDeposit() {
   const {account, web3} = this.props;
   const value = this.amountToDeposit;
   const valueWei = web3.utils.toWei(value, "ether");

    try {
    if(account) {
        //get AMPL allowance
        const ampl = new web3.eth.Contract(erc20Abi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
        ampl.methods.allowance(account, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0").call().then(allowance => {
          this.props.dispatch(checkAllowance(allowance));
          const to_allow = "" + (valueWei > allowance? valueWei - allowance : 0);
          console.log("PLOp", allowance, valueWei, to_allow);
          if(to_allow > 0) {
            const ampl = new web3.eth.Contract(erc20Abi.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
            const tx = ampl.methods.approve("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", to_allow).send({from: account}).then(result => {
              console.log("allowance result:", result);
              //deposit AMPL
              const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
              const tx = ampleSenseVault.methods.makeDeposit(valueWei).send({from: account});
              this.props.dispatch(makeDeposit(tx));

            })
            this.props.dispatch(makeApproval(tx));
          } else {
              //deposit AMPL
              const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
              const tx = ampleSenseVault.methods.makeDeposit(valueWei).send({from: account});
              this.props.dispatch(makeDeposit(tx));
          }
        })
        
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
        const ampleSenseVault = new web3.eth.Contract(AmplesenseVaultAbi.abi, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
        const tx = ampleSenseVault.methods.withdraw(value).send({from: account});
        this.props.dispatch(makeWithdrawal(tx));
      }
    } catch(error) {
      console.log('calling withdraw AMPL failed!', error)
    }
  }

  render() {

    var tokenId = 0;
    const { ampl_balance } = this.props;
    const { ampl_withdraw } = this.props;
    const { kmpl_price } = this.props;
    const {account} = this.props;
    const {web3} = this.props;


    if (this.getId()) {
          tokenId = this.getId();
        //  console.log('VAULT ID: ', this.getId());
    } else {
          tokenId = 0;
        //  console.log('VAULT ID: no vault id');
    }
    
    // check that token id is between 0 and max tokens from the data file
    if (tokenId >= tokenDetailedData.length || tokenId < 0) {
      tokenId = 0;
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
                {tokenDetailedData[tokenId].token_name} Wallet Balance: {ampl_balance}  {tokenDetailedData[tokenId].token_name}</p>} 
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
                {tokenDetailedData[tokenId].token_name} Available to Withdraw: 5,169 {tokenDetailedData[tokenId].token_name}</p>} 
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
                  <Button color="default" size="lg" className="mb-md mr-sm">Withdraw</Button>
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
                        &nbsp;38,509 {tokenDetailedData[tokenId].token_name}
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
                       &nbsp;{tokenDetailedData[tokenId].rewards_token_amount_1} {tokenDetailedData[tokenId].rewards_token_1}</span>     
                      <p>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        &nbsp;{tokenDetailedData[tokenId].rewards_token_amount_2} {tokenDetailedData[tokenId].rewards_token_2}</span>  
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
                 
                  <tr key={0}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/03/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,745 {tokenDetailedData[tokenId].token_name}
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xde...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   
              
                  <tr key={1}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/04/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,445 {tokenDetailedData[tokenId].token_name}
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xf3...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   

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
    kmpl_price: store.blockchain.kmpl_price
  };
}


export default withRouter(connect(mapStateToProps)(VaultDetail));

