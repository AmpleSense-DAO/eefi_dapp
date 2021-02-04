import React from "react";
import { Row, Col, Table } from "reactstrap";

import usersImg from "../../images/usersImg.svg";
import smileImg from "../../images/smileImg.svg";
import totalSale from "../../images/total-sale.svg";
import orders from "../../images/orders.svg";
import stocksImg from "../../images/stocks.svg";
import stocksDownImg from "../../images/stocksDown.svg";

import { chartData } from "./chartsMock";

import Widget from "../../components/Widget";

import s from "./VaultDetail.module.scss";
import ApexChart from "react-apexcharts";


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

//people
import p1 from "../../images/people/p1.png";
import p2 from "../../images/people/p2.png";
import p3 from "../../images/people/p3.png";
import p4 from "../../images/people/p4.png";
import p5 from "../../images/userAvatar.png";

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
    window.addEventListener("resize", this.forceUpdate.bind(this))
  }

  forceUpdate() {
    return this.setState({})
  }

  render() {
    return (
      <div className={s.root}>
        <Row>

         {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>AMPL Wallet Balance: 83,569 $</p>} customDropDown
              >
                <div>
                
                  <FormGroup>
                       <Label for="search-input1">
                          Amount to Deposit
                        </Label>
                        <InputGroup>
                          <Input type="text" id="search-input1" />
                          <InputGroupAddon addonType="append">
                            <Button color="default"> MAX </Button>
                          </InputGroupAddon>
                        </InputGroup>
                   </FormGroup>
                  <p className="fs-mini text-muted">
                    Deposits for 90 days.
                  </p>
                  <p className={"d-flex align-items-center "}>
                    <Button color="default" size="lg" className="mb-md mr-sm">Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */}
            <Col md={6} sm={12} xs={12}>
                    <Widget
                title={<p style={{ fontWeight: 700 }}>AMPL Available to With: 83,569 $</p>} customDropDown
              >
                <div>
                
                  <FormGroup>
                       <Label for="search-input1">
                          Amount to Withdraw
                        </Label>
                        <InputGroup>
                          <Input type="text" id="search-input1" />
                          <InputGroupAddon addonType="append">
                            <Button color="default"> MAX </Button>
                          </InputGroupAddon>
                        </InputGroup>
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
            <Widget
              customDropDown
              
            >
                <Table className="table-hover" responsive>


                <thead>
                  <tr>
                    <th key={0} scope="col" className={"pl-0"}>
                      Supply
                    </th>
                    <th key={1} scope="col" className={"pl-0"}>
                      APY
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      Rewards
                    </th>
                   
                   
                  </tr>
                </thead>
                <tbody className="text-dark">
                  <tr key={0}>
                    <td className="fw-thin pl-0 fw-thin">
                      <p className={"d-flex align-items-center"}>
                        38 509 AMPL
                        </p>
                      <p>Portion of AMPL sold during positive rebases, </p><p>Balance can decline during negative rebases.</p>
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      
                      220 %
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    
                    <p className={"d-flex align-items-center"}>
                      <img src={p1} alt="" className={"mr-3"} />
                       309.23 EEFI 
                        </p>
                      <p>
                        <img src={p1} alt="" className={"mr-3"} />
                        9.23 ETH 
                        </p>
                      <p>
                        <Button color="primary" className="mb-md mr-md">Claim</Button>
                      </p>
                    </td>
                    
                  </tr>
                  <tr key={1}>
                    <td className="fw-normal pl-0 fw-thin">
                      2590 EEFI / ETH
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      145 %
                    </td>
                    <td className={"pl-0 fw-thin"}>08 Jan 2020</td>
                    
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

export default VaultDetail;
