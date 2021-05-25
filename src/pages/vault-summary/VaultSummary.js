import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import {  Link } from "react-router-dom";

import usersImg from "../../images/usersImg.svg";
import usersDangerImg from '../../images/theme-icons/red/Users.svg'
import usersSuccessImg from '../../images/theme-icons/green/Users.svg'
import usersInfoImg from '../../images/theme-icons/blue/Users.svg'
import smileImg from "../../images/smileImg.svg";
import smileDangerImg from '../../images/theme-icons/red/Smile.svg'
import smileSuccessImg from '../../images/theme-icons/green/Smile.svg'
import smileInfoImg from '../../images/theme-icons/blue/Smile.svg'
import totalSale from "../../images/total-sale.svg";
import totalSaleDangerImg from '../../images/theme-icons/red/Sale.svg'
import totalSaleSuccessImg from '../../images/theme-icons/green/Sale.svg'
import totalSaleInfoImg from '../../images/theme-icons/blue/Sale.svg'
import orders from "../../images/orders.svg";
import ordersDangerImg from '../../images/theme-icons/red/Orders.svg'
import ordersSuccessImg from '../../images/theme-icons/green/Orders.svg'
import ordersInfoImg from '../../images/theme-icons/blue/Orders.svg'
import stocksImg from "../../images/stocks.svg";

import { chartData } from "./chartsMock";

import Widget from "../../components/Widget";

import s from "./VaultSummary.module.scss";
import ApexChart from "react-apexcharts";

// logos
import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/new_ee_balancer.png";
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
// import p5 from "../../images/userAvatar.png";
// import p6 from "../../images/tokens/zeus_cropped_edited_sm.png";
import p7 from "../../images/tokens/kmpl_uni_logo.png";


import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchVaultSummary } from "../../../src/actions/vault";

//import { WalletConnect, ProviderContext } from '../../components/Wallet/walletConnect'

// import {fetchKMPLPrice} from "../../actions/blockchain";

// const axios = require('axios')
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

const orderValueOverrideDanger = {
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 169, 131, 0.3)"],
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

const orderValueOverrideInfo = {
  options: {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["rgba(255, 119, 105, .3)"],
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
    colors: ["rgba(255, 169, 131, .3)"],
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

const convertionRateOverrideDanger = {
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
    colors: ["rgba(50, 50, 50, 0.3)"],
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
      type: "solid",
      colors: ["rgba(252, 215, 206, .25)"],
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

const areaDanger = {
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
      type: "solid",
      colors: ["rgba(194, 194, 194, .3)"],
    },
    colors: ["#323232"],
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
      type: "solid",
      colors: ["rgba(255, 230, 179, .25)"],
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

const area2Danger = {
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
      type: "solid",
      colors: ["rgba(255, 169, 131, .3)"],
    },
    colors: ["rgba(255, 169, 131, 1)"],
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

const area2Info = {
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
      type: "solid",
      colors: ["rgba(255, 119, 105, .3)"],
    },
    colors: ["#FF7769"],
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
      colors: ["rgba(202, 238, 245, 0.3)", "rgba(0,0,0,0)"],
      type: "solid",
    },
    colors: ["#4DC7DF", "#323232"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: 'rgba(196, 196, 196, 0.2)'
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

const splineAreaDanger = {
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
      colors: ["rgba(255, 214, 210, .3)", "rgba(0,0,0,0)"],
      type: "solid",
    },
    colors: ["#FF7769", "#323232"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: 'rgba(196, 196, 196, 0.2)'
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

const splineAreaSuccess = {
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
      colors: ["rgba(217, 242, 235, .3)", "rgba(0,0,0,0)"],
      type: "solid",
    },
    colors: ["#81D4BB", "#323232"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: 'rgba(196, 196, 196, 0.2)'
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

const splineAreaInfo = {
  series: [
    {
      name: "Income",
      data: [31, 40, 28, 51, 42, 109, 100],
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
      colors: ["rgba(202, 238, 245, 0.3)", "rgba(0,0,0,0)"],
      type: "solid",
    },
    colors: ["#4DC7DF", "#323232"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: 'rgba(196, 196, 196, 0.2)'
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



class VaultSummary extends React.Component {
  constructor() {
    super();
    this.forceUpdate = this.forceUpdate.bind(this);
    this.updateChartsColor = this.updateChartsColor.bind(this);
  }
  state = {
    orderValue: { ...chartData.apex.column, ...orderValueOverride },
    convertionRate: { ...chartData.apex.column, ...convertionRateOverride },
    area: { ...area },
    area2: { ...area2 },
    splineArea: { ...splineArea },
    pie: {
      options: {
        chart: {
          type: 'donut'
        },
        colors: ['#FFBF69', "#323232", '#FF7769'],
        labels: ["On progress", "Canceled", "Booked"],
        stroke: {
          show: false,
          width: 0
        },
        plotOptions: {
          pie: {
            donut: {
              size: '45%'
            }
          }
        },
        dataLabels: {
          dropShadow: {
            enabled: false
          }
        },
        legend: {
          show: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    },
    usersImg: usersImg,
    smileImg: smileImg,
    saleImg: totalSale,
    ordersImg: orders
  };

  updateChartsColor(themeColor) {
    switch (themeColor) {
      case "warning":
        this.setState({
          orderValue: { ...chartData.apex.column, ...orderValueOverride },
          convertionRate: {
            ...chartData.apex.column,
            ...convertionRateOverride,
          },
          area: { ...area },
          area2: { ...area2 },
          splineArea: { ...splineArea },
              pie: {
                options: {
                  chart: {
                    type: 'donut'
                  },
                  colors: ['#FFBF69', "#323232", '#FF7769'],
                  labels: ["On progress", "Canceled", "Booked"],
                  stroke: {
                    show: false,
                    width: 0
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '45%'
                      }
                    }
                  },
                  dataLabels: {
                    dropShadow: {
                      enabled: false
                    }
                  },
                  legend: {
                    show: false
                  },
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }]
                }
              },
          usersImg: usersImg,
          smileImg: smileImg,
          saleImg: totalSale,
          ordersImg: orders
        });
        break;
      case "danger":
        this.setState({
          orderValue: { ...chartData.apex.column, ...orderValueOverrideDanger },
          convertionRate: {
            ...chartData.apex.column,
            ...convertionRateOverrideDanger,
          },
          area: { ...areaDanger },
          area2: { ...area2Danger },
          pie: {
            options: {
              chart: {
                type: 'donut'
              },
              colors: ['#FF7769', "#323232", '#FFA983'],
              labels: ["On progress", "Canceled", "Booked"],
              stroke: {
                show: false,
                width: 0
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '45%'
                  }
                }
              },
              dataLabels: {
                dropShadow: {
                  enabled: false
                }
              },
              legend: {
                show: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
          },
          splineArea: { ...splineAreaDanger },
          usersImg: usersDangerImg,
          smileImg: smileDangerImg,
          saleImg: totalSaleDangerImg,
          ordersImg: ordersDangerImg
        });
        break;
      case "success":
        this.setState({
          orderValue: { ...chartData.apex.column, ...orderValueOverrideDanger },
          convertionRate: {
            ...chartData.apex.column,
            ...convertionRateOverrideDanger,
          },
          area: { ...areaDanger },
          area2: { ...area2Danger },
          splineArea: { ...splineAreaSuccess },
          pie: {
            options: {
              chart: {
                type: 'donut'
              },
              colors: ['#81D4BB', "#323232", '#FFA983'],
              labels: ["On progress", "Canceled", "Booked"],
              stroke: {
                show: false,
                width: 0
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '45%'
                  }
                }
              },
              dataLabels: {
                dropShadow: {
                  enabled: false
                }
              },
              legend: {
                show: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
          },
          usersImg: usersSuccessImg,
          smileImg: smileSuccessImg,
          saleImg: totalSaleSuccessImg,
          ordersImg: ordersSuccessImg
        });
        break;
      case "info":
        this.setState({
          orderValue: { ...chartData.apex.column, ...orderValueOverrideInfo },
          convertionRate: {
            ...chartData.apex.column,
            ...convertionRateOverrideDanger,
          },
          area: { ...areaDanger },
          area2: { ...area2Info },
          splineArea: { ...splineAreaInfo },
          pie: {
            options: {
              chart: {
                type: 'donut'
              },
              colors: ['#4DC7DF', "#323232", '#FF7769'],
              labels: ["On progress", "Canceled", "Booked"],
              stroke: {
                show: false,
                width: 0
              },
              plotOptions: {
                pie: {
                  donut: {
                    size: '45%'
                  }
                }
              },
              dataLabels: {
                dropShadow: {
                  enabled: false
                }
              },
              legend: {
                show: false
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }
          },
          usersImg: usersInfoImg,
          smileImg: smileInfoImg,
          saleImg: totalSaleInfoImg,
          ordersImg: ordersInfoImg
        });
        break;
      default:
        break;
    }
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

  componentDidMount() {
    const {
      account,
      web3,
    } = this.props;

    // const contract = new VaultContract(this.getVaultType(), web3, account);

    window.addEventListener("resize", this.forceUpdate.bind(this));
    // if wallet is connected
    if(account) {
      this.props.dispatch(fetchVaultSummary());
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dashboardColor !== this.props.dashboardColor) {
      switch (this.props.dashboardColor) {
        case "warning":
          this.updateChartsColor("warning");
          break;
        case "danger":
          this.updateChartsColor("danger");
          break;
        case "success":
          this.updateChartsColor("success");
          break;
        case "info":
          this.updateChartsColor("info");
          break;
        default:
          break;
      }
    }
  }

  forceUpdate() {
    return this.setState({});
  }

  render() {

    const { kmpl_price } = this.props;

    return (

      <div className={s.root}>
        <h2>
        Vault Summary
        </h2>
        <Row>
          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>TVL</p>}>
              <Row className={`justify-content-between mt-3`} noGutters>

                <Col sm={8} className={"d-flex align-items-center"}>
                  <h4 className={"fw-semi-bold mb-0"}>$ {this.props.vault.tvl}</h4>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>40%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>

              </Row>
            </Widget>
          </Col>
          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>Your Portfolio</p>}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h4 className={"fw-semi-bold mb-0"}>$ {this.props.vault.portfolio}</h4>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >

                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>15%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>

              </Row>
            </Widget>
          </Col>

          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>kMPL Price</p>}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h4 className={"fw-semi-bold mb-0"}>$ {this.props.vault.kmpl_price} </h4>
                </Col>
                <Col  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>15%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
              </Row>
            </Widget>
          </Col>

          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>EEFI Price</p>}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h4 className={"fw-semi-bold mb-0"}>$ {this.props.vault.eefi_price}</h4>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>15%</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
              </Row>
            </Widget>
          </Col>
        </Row>

    {/* AMPL */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr  key={0}>
                    <td width="35%" className=" align-items-center  table-vaults-long-1 ">
                      <Link to="/app/home/vault-detail/0">
                          <span className={"d-flex  align-items-center fw-bold"}>
                          <img src={p1} height={80} width={80} alt="" className={"mr-3"} />

                          <h4 className="text-info">
                          AMPL
                          </h4>
                          </span>
                      </Link>
                    </td>

                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-detail/0">
                        <p className={"d-flex  align-items-center fw-bold"}>
                        <img src={p1} height={80} width={80} alt="" className={"mr-3"} />

                        </p>
                        <h5 className="text-info" >
                        AMPL
                        </h5>
                      </Link>
                      <Link to="/app/home/vault-detail/0">
                        <Button color="primary" className="mb-md mr-md">Select</Button>
                      </Link>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; AMPL
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                    </td>

                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,444,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 60%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 46,565
                      </p>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; AMPL
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>

                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,444,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 60%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 46,565
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-detail/0">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

    {/* EEFI/ETH LP Tokens */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr  key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-detail/1">
                          <span className={"d-flex  align-items-center fw-bold"}>
                            <img src={p2} height={80} width={80} alt="" className={"mr-3"} />
                            <h4 className="text-info">
                            EEFI/ETH LP Tokens
                            </h4>
                          </span>
                      </Link>
                    </td>

                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-eefi">
                        <p className={"d-flex  align-items-center fw-bold"}>
                        <img src={p2} height={80} width={80} alt="" className={"mr-3"} />
                        </p>
                        <h5 className="text-info" >
                        EEFI/ETH<br></br>LP Tokens
                        </h5>
                      </Link>
                      <Link to="/app/home/vault-eefi">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; EEFI/ETH LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                    </td>

                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,944,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 400%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 46,565
                      </p>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; EEFI/ETH LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,444,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 400%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 46,565
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-detail/1">
                      <p>
                        <Button color="primary" className="mb-md mr-md">Select</Button>
                      </p>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

    {/* kMPL Tokens */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr  key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-detail/2">
                          <span className={"d-flex  align-items-center fw-bold"}>
                            <img src={p3} height={80} width={80} alt="" className={"mr-3"} />
                            <h4 className="text-info">
                            kMPL
                            </h4>
                          </span>
                      </Link>
                    </td>

                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-gen-page">
                        <p className={"d-flex  align-items-center fw-bold"}>
                        <img src={p3} height={80} width={80} alt="" className={"mr-3"} />
                        </p>
                        <h5 className="text-info" >
                        kMPL
                        </h5>
                      </Link>
                      <Link to="/app/home/vault-gen-page">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;Various Token Rewards
                      </p>
                    </td>

                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,944,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 60%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 46,565
                      </p>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;Various Token Rewards
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 2,444,565
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 60%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ 6,565
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-detail/2">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

   {/* Pioneer NFTs  */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr  key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-nfts">
                          <span className={"d-flex  align-items-center fw-bold"}>
                          <img src={p4} height={80} width={80} alt="" className={"mr-3"} />

                          <h4 className="text-info align-items-center">
                          Pioneer NFTs
                          </h4>
                          </span>
                      </Link>
                    </td>

                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-nfts">
                        <p className={"d-flex  align-items-center fw-bold mb-md mr-md"}>
                          <img src={p4} height={80} width={80} alt="" className={"mr-3"} />
                        </p>
                        <span  className={"d-flex  fw-bold mb-md mr-md"}>
                          <h5 className="text-info" >
                          Pioneer <br></br>NFTs
                          </h5>
                        </span>
                      </Link>
                      <Link to="/app/home/vault-nfts">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; Pioneer NFTs
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;ETH
                      </p>
                    </td>

                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp;  N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; 1
                      </p>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; Pioneer NFTs
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;1
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-nfts">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

  {/* kMPL/ETH  */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr  key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-detail/4">
                          <span className={"d-flex  align-items-center fw-bold"}>
                            <img src={p7} height={80} width={80} alt="" className={"mr-3"} />
                            <h4 className="text-info">
                            kMPL/ETH LP Tokens
                            </h4>
                          </span>
                      </Link>
                    </td>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-nfts">
                        <p className={"d-flex  align-items-center fw-bold mb-md mr-md"}>
                          <img src={p7} height={80} width={80} alt="" className={"mr-3"} />
                        </p>
                        <h5 className="text-info" >
                        kMPL/ETH <br></br>LP Tokens
                        </h5>
                      </Link>
                      <Link to="/app/home/vault-nfts">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL/ETH LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;ETH
                      </p>
                    </td>

                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ 3,567,543
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 90 %
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; 1
                      </p>
                    </td>

                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL/ETH LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp;  $ 3,567,543
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; 90%
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;8,707
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-detail/4">
                      <p>
                        <Button color="primary" className="mb-md mr-md">Select</Button>
                      </p>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>

        <Row>
          <Col xl={12}>
            <Widget
              title={
                <Row>
                  <Col xs={12} sm={5}>
                    <p style={{ fontWeight: 700 }}>Total Value Locked: All Vaults</p>
                  </Col>
                  <Col xs={12} sm={7}>
                    <div className="chart-legend" />
                  </Col>
                </Row>
              }
            >
              <Row style={{ marginTop: -36 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    series={this.state.splineArea.series}
                    options={this.state.splineArea.options}
                    type={"area"}
                    height={"350px"}
                  />
                </Col>
              </Row>
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
    sidebarColor: store.layout.sidebarColor,
    dashboardColor: store.layout.dashboardTheme,
    kmpl_price: store.blockchain.kmpl_price,
    vault: store.vault
  };
}

export default withRouter(connect(mapStateToProps)(VaultSummary));
