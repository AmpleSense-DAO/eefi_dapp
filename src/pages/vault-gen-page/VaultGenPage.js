import React from "react";
import { Row, Col, Table } from "reactstrap";

import { chartData } from "./chartsMock";

import Widget from "../../components/Widget";

import s from "./VaultGenPage.module.scss";


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

//tokens
//import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
//import p3 from "../../images/tokens/kappa_logo_kmpl.png";
//import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";

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

class VaultGenPage extends React.Component {
  constructor() {
    super();
    this.forceUpdate = this.forceUpdate.bind(this)
  }
  state = {
    orderValue: { ...chartData.apex.column, ...orderValueOverride },
    convertionRate: { ...chartData.apex.column, ...convertionRateOverride },
    area: { ...area },
    area2: { ...area2 },
    splineArea: { ...splineArea },
  };

  componentDidMount() {
    //window.addEventListener("resize", this.forceUpdate.bind(this))
  }

  forceUpdate() {
    return this.setState({})
  }

  render() {
    return (

      <div className={s.root}>
        <p>
          <h2>
            Pioneer Fund Vault II: kMPL
          </h2>
        </p>

        <Row>
          {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>kMPL Wallet Balance: 83,569 kMPL</p>} >
                <div>
                  <FormGroup>
                    <Label for="bar">
                      Amount to Deposit
                    </Label>
                    <Table className="table-hover " responsive>
                      <thead>
                        <tr>
                          <th key={0}  scope="col" className={"pl-0"}>
                            <InputGroup>
                              <Input type="text" id="bar" />
                              <InputGroupAddon addonType="append">
                                <ButtonGroup>
                                  <Button color="ample1"><i className="fa " />25%</Button>
                                  <Button color="ample2"><i className="fa " />50%</Button>
                                  <Button color="ample3"><i className="fa " />75%</Button>
                                  <Button color="ample4"><i className="fa " />100%</Button>
                                </ButtonGroup>
                              </InputGroupAddon>
                            </InputGroup>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </FormGroup>
                  <p className={"d-flex align-items-center "} >
                    <Button color="default" size="lg" align="center" className="mb-md mr-sm">Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */}
            <Col md={6} sm={12} xs={12}>
              <Widget title={<p style={{ fontWeight: 700 }}>kMPL Available to Withdraw: 12,569 kMPL</p>} >
                <div>
                  <FormGroup>
                    <Label for="bar">
                      Amount to Deposit
                    </Label>
                    <Table className="table-hover " responsive>
                      <thead>
                        <tr>
                          <th key={0}  scope="col" className={"pl-0"}>
                            <InputGroup>
                              <Input type="text" id="bar" />
                              <InputGroupAddon addonType="append">
                                <ButtonGroup>
                                  <Button color="ample1"><i className="fa " />25%</Button>
                                  <Button color="ample2"><i className="fa " />50%</Button>
                                  <Button color="ample3"><i className="fa " />75%</Button>
                                  <Button color="ample4"><i className="fa " />100%</Button>
                                </ButtonGroup>
                              </InputGroupAddon>
                            </InputGroup>
                          </th>
                        </tr>
                      </thead>
                    </Table>
                  </FormGroup>

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
              <p>
                <h3>Your Staked Balance and Rewards</h3>
              </p>
              <p>
                <Table className="table-hover table-bordered" responsive>
                  <thead>
                    <tr>
                      <th key={0} width="50%"  scope="col" className={"pl-0"}>
                        &nbsp;Staked kMPL
                      </th>
                      <th key={2} scope="col" className={"pl-0"}>
                        &nbsp;Rewards
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-dark">
                    <tr key={0}>
                      <td className="fw-thin pl-0 fw-thin">
                        <h3>
                          &nbsp;8,709 kMPL
                        </h3>
                        <p><h4>APY 50%</h4></p>
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        <h4>
                          <img height="30" src={p2} alt="" className={"mr-3"} />
                          <span align="right">&nbsp;309.23 EEFI</span>
                          <p>
                            <img height="30" src={p5} alt="" className={"mr-3"} />
                            <span align="right"> &nbsp;9.23 ETH</span>
                          </p>
                        </h4>
                          <p>
                            <Button color="primary" className="mb-md mr-md">Claim</Button>
                          </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </p>
              <p>
                <h3>Your Deposit History</h3>
              </p>
              <p>
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
                        &nbsp;1,745 kMPL
                      </td>
                      <td className={"pl-0 fw-thin"}> &nbsp;0xde...
                        <a href="https://www.etherscan.io"  target="_blank" rel="noopener noreferrer">Link</a>
                      </td>
                    </tr>
                    <tr key={1}>
                      <td className="fw-normal pl-0 fw-thin">
                        &nbsp;2021/04/15
                      </td>
                      <td className={"pl-0 fw-thin"}>
                        &nbsp;1,445 kMPL
                      </td>
                      <td className={"pl-0 fw-thin"}> &nbsp;0xf3...
                        <a href="https://www.etherscan.io"  target="_blank" rel="noopener noreferrer">Link</a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </p>
            </Widget>
          </Col>
        </Row>
     </div>
    );
  }
}

export default VaultGenPage;
