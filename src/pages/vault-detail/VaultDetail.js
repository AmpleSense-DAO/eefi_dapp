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
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";
import p7 from "../../images/tokens/kmpl_uni_logo.png";

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
const { VaultContract, VaultType, vaultTypeFromID } = require("../../components/Blockchain/Updater.js");

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

  componentDidUpdate(prevProps, prevState) {
    if(this.getId() >= 0)
      this.props.dispatch(setVaultType(this.getId()));
  }

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
  }

  handleChangeToWithdraw(evt) {
    this.setState({
      amountToWithdraw: evt.target.value
    })
  }

  calculateAmountToDeposit(evt) {
    const { staking_token_balance, account, web3 } = this.props;
    const precisionName = (new VaultContract(this.getVaultType(), web3, account)).stakingTokenPrecisionName();
    const maxStakingTokenPrecision = (new VaultContract(this.getVaultType(), web3, account)).maxStakingTokenDisplayPrecision();
    this.setState({
        amountToDeposit: (web3.utils.fromWei(staking_token_balance, precisionName) * evt.target.value).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: maxStakingTokenPrecision
      })
    });
  }

  calculateAmountToWithdraw(evt) {
    const { claimable, account, web3 } = this.props;
    const precisionName = (new VaultContract(this.getVaultType(), web3, account)).stakingTokenPrecisionName();
    const maxStakingTokenPrecision = (new VaultContract(this.getVaultType(), web3, account)).maxStakingTokenDisplayPrecision();
    this.setState({
        amountToWithdraw: (web3.utils.fromWei(claimable, precisionName) * evt.target.value).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: maxStakingTokenPrecision
      })
      })
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

  doClaim() {
    const {account, web3} = this.props;

    const contract = new VaultContract(vaultTypeFromID[this.getId()], web3, account);

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
    const contract = new VaultContract(vaultTypeFromID[this.getId()], web3, account);
    const valueWei = contract.getValueWei(this.state.amountToDeposit.replace(/,/g, ''));
    const current_time = Math.floor(Date.now()/1000);
    this.props.dispatch(makeDeposit(vaultTypeFromID[this.getId()], web3, account, valueWei, {id: current_time, transactionHash: null, allowanceHash: null, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false, allowanceMined: false}));
    this.setState({
      amountToDeposit: 0
    })
  }

  getVaultType() {
    return vaultTypeFromID[this.getId()];
  }

  doWithdraw() {
    const {account, web3} = this.props;
    const contract = new VaultContract(vaultTypeFromID[this.getId()], web3, account);

    const valueWei = web3.utils.toWei(this.state.amountToWithdraw.replace(/,/g, ''), contract.stakingTokenPrecisionName());
    const current_time = Math.floor(Date.now()/1000);
    this.props.dispatch(makeWithdrawal(vaultTypeFromID[this.getId()], web3, account, valueWei, {id: current_time, transactionHash: null, returnValues: {amount: valueWei.toString()}, timestamp: current_time, mined: false}));
    this.setState({
      amountToWithdraw: 0
    })
  }

  render() {
    var tokenId = 0;
    const {
      // vault_type,
      staking_token_balance,
      staking_token_withdraw,
      claimable,
      // kmpl_price,
      reward,
      account,
      web3,
      deposits,
      withdrawals
    } = this.props;

    const contract = new VaultContract(vaultTypeFromID[this.getId()], web3, account);

    if (this.getId()) {
          tokenId = this.getId();
    } else {
          tokenId = 0;
    }

    let withdrawDate = null;
    let dd,mm,yyyy;

    if(tokenId == 0 && deposits.length > 0) {
      const first = deposits[0];
      const withdrawable = first.timestamp + 90*24*60*60;
      if(withdrawable * 1000 > Date.now()) {
        withdrawDate = new Date(withdrawable * 1000);

        dd = String(withdrawDate.getDate()).padStart(2, '0');
        mm = String(withdrawDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = withdrawDate.getFullYear();
      }
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

    const staking_token_balance_formatted = parseFloat(web3.utils.fromWei(staking_token_balance,contract.stakingTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: contract.maxStakingTokenDisplayPrecision() });
    const claimable_formatted = parseFloat(web3.utils.fromWei(claimable,contract.stakingTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: contract.maxStakingTokenDisplayPrecision() });
    const staking_token_withdraw_formatted = parseFloat(web3.utils.fromWei(staking_token_withdraw,contract.stakingTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: contract.maxStakingTokenDisplayPrecision() });;
    const ampl_eth_reward_formatted = parseFloat(web3.utils.fromWei(reward.eth, "ether")).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
    //in case of pioneer1 there is no token reward
    const ampl_token_reward_formatted = parseFloat(web3.utils.fromWei(reward.token? reward.token : "0",contract.rewardTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 });
    return (

      <div className={s.root}>
        <div className={s.headerImg}>
          { contract.stakingTokenSymbol() === "AMPL" && <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJeUExURUxpcQAAAAAAAD8/PwAAAFVVVQAAAAAAAAAAAAAAAAAAAP///39/fwAAAA4ODgEBAQEBAQAAAP///wsLC////8bGxgoKCv///woKCg4ODgAAAA0NDQAAAExMTC4uLjMzMwoKChISEi0tLRQUFH9/f1ZWVkJCQjo6OhQUFCYmJhcXFw8PDw8PDwsLCwkJCUdHRyIiIgAAABkZGRAQEEhISFJSUhISEtfX1////zMzMxkZGUFBQSoqKg8PD0hISP///xUVFXt7eyEhISoqKhgYGCkpKR0dHR0dHQoKChAQEBQUFHFxcRoaGjg4OFlZWQkJCSQkJCIiIv///yUlJSUlJTIyMgsLCx0dHU1NTbS0tDAwMAoKChgYGBUVFQAAAAEBAQEBARISEnV1dTk5ORISEh8fHxMTE9DQ0EFBQQcHByUlJRwcHDk5OQ0NDRkZGQoKChISEgEBATk5OUlJSRgYGA8PD+Li4iYmJpubmxgYGBsbGzg4OA8PDw4ODh0dHRgYGFxcXAgICBwcHBEREZubmywsLCgoKKqqql1dXRcXFzAwMBoaGg4ODjMzMw0NDaWlpQsLCx4eHjU1NUNDQxAQEEdHRygoKA4ODhAQEAoKCnZ2diIiIjAwMDMzMzo6OikpKQ8PDxsbG0ZGRq+vr39/fxwcHFZWVhMTExISEggICB8fHwUFBb+/v2traw8PD6KiohEREQgICOXl5RYWFj09PRsbGyQkJBoaGgEBATw8PAwMDAICAiMjI2lpaSIiIgAAAAEBAQUFBQICAgQEBAgICAMDAwkJCQ0NDQYGBgcHB7CGDNAAAAC/dFJOUwD3/QQCA/4BAwT5AwL6yP78+wLWBBLKAfvH+MkGCpt31fRxxRovaFxxg8/Xxsg2TpT8y9M8PugNBU/cOoXJLgfWI5AGwoC/r/725BvERCj6XCwIlWZ+8pwuEYn9r8sH+vnrGlTsieYLPvyBs0f1ysnZ+1Uts+QJjBLHqFvx4JPNL/mg7hdbdwwmw1616QXwFPOyUVP3J3/G+/kcf2qqcW/DtzYgHMYs1NP1mfwUGsgW2fsKy0uuqq33WPn8hymLeTbbhQAAAhlJREFUWMPtVWVz3DAQXfscr3SXuzCnTVNmZkyZmZmZmSkpp8zMzMztygdp+6/qeOo2M/1QSzf95vfB49HM0+q93ScB+PDhwxMMTI6fJN3m16+VDJ9Do9K69lfdgMy2VA8MdT70HJSe3wBS1BXMF5pooqwBceF2fTW1C6FiLwJ4Kv6d9Kr2qhoY3Hh0RYTFWPtPBalwO//+rQsmLRijauG1xCW4Q0FrmZoGDN37cRevxjRRrqSBwU3reh4+OW5SxSaVTDB4mLgMxVBJwdhWCCjE6NjRBxfhCO6NFdJSBQ0cDkVPADNgzzYyl8+xeyKdg4PiJHK79BazMDoOZcc5BXbFD++3hQRwrhWkYdKR5LCRdlQrR5g8j/SRIyR3QNiw3lrkWMdhotCi/SUjyXFNdFW2k0IGw60wlWWjpIXraIlbtNcQyqjqIDXOqXBg9+K1vygc+ggtrbWUBg5naWcmug3pFm9DHTtJjDPiy+e0zy2J2LkrZVhdkEnE4LX14szvxnHoLjRzIMhs8MZ8FcI/QzVpqm5OGIqG57vwy0fxucbwGqHpFEyMh77eDLBP+o5iH6DYLWjMgCk0S5+dA8ybimdfrfef3j6usZIzLT08M21Ab0+v+ejN56kap1eMcnxn2KrfYGeFvjUtyTP+6V/LrNxzTyNFBSuzGju+M2jYLLegKBLp0bxFndqKN7zsi+birwVE8OHDh4//hp9kzYDsFysvpQAAAABJRU5ErkJggg==" height={80} width={80} alt="" className={s.mobileImg} />}
          { contract.stakingTokenSymbol() === "Balancer LP" && <img src={p2} height={80} width={80} alt="" className={s.mobileImg} />}
          { contract.stakingTokenSymbol() === "kMPL" && <img src={p3} height={80} width={80} alt="" className={s.mobileImg} />}
          { contract.stakingTokenSymbol() === "ZNFT" && <div></div>}
          { contract.stakingTokenSymbol() === "ANFT" && <div></div>}
          { contract.stakingTokenSymbol() === "UniswapV2" && <img src={p7} height={80} width={80} alt="" className={s.mobileImg} />}
          <div className={s.headerText}>
            <h2>
              {contract.vaultName()}
            </h2>
          </div>
        </div>
        <Row>
            {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>
                {contract.stakingTokenSymbol()} {contract.stakingTokenSymbol()==="Balancer LP" ? "Tokens" : "Balance"}: {staking_token_balance_formatted}  {contract.stakingTokenSymbol()}</p>}
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
                                  {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample1" onClick={this.calculateAmountToDeposit} value={0.25}><i className="fa " />25%</Button>}
                                    {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample2" onClick={this.calculateAmountToDeposit} value={0.50}><i className="fa " />50%</Button>}
                                    {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample3" onClick={this.calculateAmountToDeposit} value={0.75}><i className="fa " />75%</Button>}
                                    <Button color="ample4" onClick={this.calculateAmountToDeposit} value={1.0}><i className="fa " />100%</Button>
                                  </ButtonGroup>
                                </InputGroupAddon>
                              </InputGroup>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </FormGroup>
                  { contract.stakingTokenSymbol()==="AMPL" &&
                  <p className="fs-mini text-muted">
                    {contract.stakingTokenSymbol()} deposits locked for 90 days.
                  </p> }
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
                {contract.stakingTokenSymbol()} {contract.stakingTokenSymbol()==="Balancer LP" ? "Tokens" : ""} Available to Withdraw: {claimable_formatted} {contract.stakingTokenSymbol()}</p>}
              >
                {withdrawDate && <p style={{ fontWeight: 400 }}>
                      Estimated Date Initial AMPL Deposit Available to Withdraw: {dd}.{mm}.{yyyy}</p>}
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
                                  {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample1" onClick={this.calculateAmountToWithdraw} value={0.25}><i className="fa " />25%</Button>}
                                  {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample2" onClick={this.calculateAmountToWithdraw} value={0.50}><i className="fa " />50%</Button>}
                                  {/*do not display for nfts*/tokenId != 3 && tokenId != 4 && <Button color="ample3" onClick={this.calculateAmountToWithdraw} value={0.75}><i className="fa " />75%</Button>}
                                  <Button color="ample4" onClick={this.calculateAmountToWithdraw} value={1.0}><i className="fa " />100%</Button>
                                </ButtonGroup>
                              </InputGroupAddon>
                            </InputGroup>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </FormGroup>

                {/* <p className="fs-mini text-muted">
                  Unlocked {contract.stakingTokenSymbol()}
                </p> */}
                <p className={"d-flex align-items-center "}>
                  <Button color="default" size="lg" className="mb-md mr-sm" disabled={this.state.amountToWithdraw === "0"} onClick={this.doWithdraw}>Claim/Withdraw</Button>
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
                      &nbsp;Staked {contract.stakingTokenSymbol()} {contract.stakingTokenSymbol()==="Balancer LP" ? "Tokens" : ""}
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
                      &nbsp;{staking_token_withdraw_formatted} {contract.stakingTokenSymbol()} {contract.stakingTokenSymbol()==="Balancer LP" ? "Tokens" : ""}
                      </h3>
                      <h4>APY {tokenDetailedData[tokenId].apy}</h4>
                      <br></br>
                      {tokenDetailedData[tokenId].staked_section_desc_1 ? tokenDetailedData[tokenId].staked_section_desc_1 : null}
                      <br></br>
                      {tokenDetailedData[tokenId].staked_section_desc_2 ? tokenDetailedData[tokenId].staked_section_desc_2 : null}
                    </td>

                    <td className={"pl-0 fw-thin"}>
                    <h4>
                      { contract.stakingTokenSymbol() !== "ANFT" && contract.stakingTokenSymbol() !== "ZNFT" &&
                      <p>
                        <img height="30" src={p2} alt="" className={"mr-3"} />
                        <span align="right">
                          &nbsp;{ampl_token_reward_formatted} {tokenDetailedData[tokenId].rewards_token_1}
                        </span>
                      </p> }
                      <p>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        &nbsp;{ampl_eth_reward_formatted} {tokenDetailedData[tokenId].rewards_token_2}</span>
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
                        &nbsp;{parseFloat(web3.utils.fromWei(deposit.returnValues.amount,contract.stakingTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: contract.maxStakingTokenDisplayPrecision() })} {contract.stakingTokenSymbol()}
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
                        &nbsp;{parseFloat(web3.utils.fromWei(withdrawal.returnValues.amount, contract.stakingTokenPrecisionName())).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: contract.maxStakingTokenDisplayPrecision() })} {contract.stakingTokenSymbol()}
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
    staking_token_balance: store.blockchain.staking_token_balance,
    staking_token_withdraw: store.blockchain.staking_token_withdraw,
    claimable: store.blockchain.claimable,
    kmpl_price: store.blockchain.kmpl_price,
    reward: store.blockchain.reward,
    deposits: store.blockchain.deposits,
    withdrawals: store.blockchain.withdrawals,
    claim_tx: store.blockchain.claim_tx,
    stakableNFTs: store.blockchain.stakableNFTs
  };
}


export default withRouter(connect(mapStateToProps)(VaultDetail));

