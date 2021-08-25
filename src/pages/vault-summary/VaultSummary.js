import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

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
// import p6 from "../../images/tokens/zeus_cropped_edited_sm.png";
import p7 from "../../images/tokens/kmpl_uni_logo.png";


import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//import { WalletConnect, ProviderContext } from '../../components/Wallet/walletConnect'

// import {fetchKMPLPrice} from "../../actions/blockchain";

// const axios = require('axios')
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
        "2021-05-24",
        "2021-05-25",
        "2021-05-26",
        "2021-05-27",
        "2021-05-28",
        "2021-05-29",
        "2021-05-30",
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
    return vaultTypeFromID[this.getId()];
  }

  numberWithCommas(x) {
    return String(x).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');
  }

  componentDidMount() {
    // const { account, web3 } = this.props;

    // const contract = new VaultContract(this.getVaultType(), web3, account);

    window.addEventListener("resize", this.forceUpdate.bind(this));
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

    const { kmpl_price, eefi_price, ampl_price, eth_price, history } = this.props;

    const amplesensevaultValues = this.props.vaultValues["Elastic Vault: AMPL > EEFI"];
    const pioneer1AValues = this.props.vaultValues["Pioneer Fund Vault I: APOLLO"];
    const pioneer1BValues = this.props.vaultValues["Pioneer Fund Vault I: ZEUS"];
    const pioneer2Values = this.props.vaultValues["Pioneer Fund Vault II: kMPL"];
    const pioneer3Values = this.props.vaultValues["Pioneer Fund Vault III: KMPL/ETH"];
    const lpStakingValues = this.props.vaultValues["EEFI/USDC LP Token Vault"];

    const amplesenseVaultStaking = amplesensevaultValues? amplesensevaultValues.stakedBalance * ampl_price : 0;
    const pioneer1AStaking = pioneer1AValues? pioneer1AValues.stakedBalance * 0 : 0;
    const pioneer1BStaking = pioneer1BValues? pioneer1BValues.stakedBalance * 0 : 0;
    const pioneer2Staking = pioneer2Values? pioneer2Values.stakedBalance * kmpl_price : 0;
    const pioneer3Staking = pioneer3Values? pioneer3Values.stakedBalance * 0 : 0;
    const lpStakingStaking = lpStakingValues? lpStakingValues.stakedBalance * 0 : 0;

    const amplesenseVaultReward = amplesensevaultValues? amplesensevaultValues.rewardBalance.token * eefi_price + amplesensevaultValues.rewardBalance.eth * eth_price : 0;
    const pioneer1AReward = pioneer1AValues? pioneer1AValues.rewardBalance * eth_price : 0;
    const pioneer1BReward = pioneer1BValues? pioneer1BValues.rewardBalance * eth_price : 0;
    const pioneer2Reward = pioneer2Values? pioneer2Values.rewardBalance.token * eefi_price + pioneer2Values.rewardBalance.eth * eth_price : 0;
    const pioneer3Reward = pioneer3Values? pioneer3Values.rewardBalance.token * eefi_price + pioneer3Values.rewardBalance.eth * eth_price : 0;
    const lpStakingReward = lpStakingValues? lpStakingValues.rewardBalance.token * eefi_price + lpStakingValues.rewardBalance.eth * eth_price : 0;

    const amplesenseVaultTVL = amplesensevaultValues? amplesensevaultValues.totalStakedBalance * ampl_price : 0;
    const pioneer1ATVL = pioneer1AValues? pioneer1AValues.totalStakedBalance * 0 : 0;
    const pioneer1BTVL = pioneer1BValues? pioneer1BValues.totalStakedBalance * 0 : 0;
    const pioneer2TVL = pioneer2Values? pioneer2Values.totalStakedBalance * kmpl_price : 0;
    const pioneer3TVL = pioneer3Values? pioneer3Values.totalStakedBalance * 0 : 0;
    const lpStakingTVL = lpStakingValues? lpStakingValues.totalStakedBalance * 0 : 0;

    // console.log(eefi_price, ampl_price, kmpl_price, eth_price)
    const portfolio = amplesenseVaultStaking + pioneer1AStaking + pioneer1BStaking + pioneer2Staking + pioneer3Staking + lpStakingStaking
    + amplesenseVaultReward + pioneer1AReward + pioneer1BReward + pioneer2Reward + pioneer3Reward + lpStakingReward;

    const tvl = amplesenseVaultTVL + pioneer1ATVL + pioneer1BTVL + pioneer2TVL + pioneer3TVL + lpStakingTVL;

    let all_tvl = [];
    history && history.forEach(tvl_event => {
      let tvl = [];
      const changes = tvl_event.changes;
      const contract = tvl_event.contract;
      changes.forEach(change => {
        let adjustedAmount = change.returnValues.total;
        if(contract.stakingTokenPrecision() > 0)
          adjustedAmount /= 10**contract.stakingTokenPrecision();

        tvl.push({total: adjustedAmount * contract.getStakingTokenPrice(kmpl_price, ampl_price, 0, 0, 0, 0), timestamp : change.returnValues.timestamp, name: contract.vaultName()});
      });
      all_tvl.push(tvl);
    });

    let merged = [].concat.apply([], all_tvl).sort((a, b) => a.timestamp - b.timestamp);

    let tvl_map = new Map();
    tvl_map.set("Elastic Vault: AMPL > EEFI", 0);
    tvl_map.set("EEFI/ETH LP Token Vault", 0);
    tvl_map.set("Pioneer Fund Vault II: kMPL", 0);
    tvl_map.set("Pioneer Fund Vault I: ZEUS", 0);
    tvl_map.set("Pioneer Fund Vault I: APOLLO", 0);
    tvl_map.set("Pioneer Fund Vault III: KMPL/ETH", 0);

    const flat_tvl = merged.map(element => {
      tvl_map.set(element.name, element.total);

      let total = 0;
      tvl_map.forEach((value) => {
        total += value;
      })

      return [parseInt(new Date(parseInt(element.timestamp)*1000).getTime()), total];
    });

    var chartData = {
      series: [
        {
          name: "TVL",
          data: flat_tvl,
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
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM \'yy',
              day: 'dd MMM',
              hour: 'HH:mm'
            }
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };

    return (

      <div className={s.root}>
        <h2>
        Vault Summary
        </h2>
        <Row>
          <Col xl={3}>
            <Widget title={<p className="text-info" style={{ fontWeight: 700 }}>TVL</p>}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h6 className={"fw-semi-bold mb-0"}>$ {this.numberWithCommas(tvl)}</h6>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>N/A</p>
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
                  <h6 className={"fw-semi-bold mb-0"}>$ {this.numberWithCommas(portfolio)}</h6>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>N/A</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
              </Row>
            </Widget>
          </Col>

          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>kMPL Price</p>} isBuyButton={true} pagelink={2}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h6 className={"fw-semi-bold mb-0"}>$ {this.numberWithCommas(kmpl_price)} </h6>
                </Col>
                <Col  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>N/A</p>
                </Col>
              </Row>
              <Row style={{ marginBottom: -9, marginTop: -1 }}>
              </Row>
            </Widget>
          </Col>

          <Col xl={3}>
            <Widget
              title={<p className="text-info" style={{ fontWeight: 700 }}>EEFI Price</p>} isBuyButton={true} pagelink={3}>
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h6 className={"fw-semi-bold mb-0"}>$ {this.numberWithCommas(eefi_price)}</h6>
                </Col>
                <Col
                  sm={4}
                  className={"d-flex align-items-center justify-content-end"}
                >
                  <img src={stocksImg} alt="" className={"mr-1"} />
                  <p className={"text-success mb-0"}>N/A</p>
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
                  <tr key={0}>
                    <td width="35%" className=" align-items-center  table-vaults-long-1 ">
                      <Link to="/app/home/vault-detail/0">
                        <span className={"d-flex  align-items-center fw-bold"}>
                          <img src={p1} height={80} width={80} alt=""  className={s.mobileImg} />
                          <h4 className="text-info">
                          AMPL
                          </h4>
                        </span>
                      </Link>
                    </td>

                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-detail/0">
                        <p className={"d-flex  align-items-center fw-bold"}>
                          <img src={p1} height={80} width={80} alt="" className={s.mobileImg}/>
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
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(amplesenseVaultTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ {this.numberWithCommas(amplesenseVaultStaking + amplesenseVaultReward)}
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
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(amplesenseVaultTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ {this.numberWithCommas(amplesenseVaultStaking + amplesenseVaultReward)}
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



        {/* EEFI/USDC LP Tokens */}
        <Row>
          <Col sm={12}>
            <Widget>
              <Table className="table-hover " responsive>
                <tbody className="text-dark">
                  <tr key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-detail/1">
                        <span className={"d-flex  align-items-center fw-bold"}>
                        <img src={p2} height={80} width={80} alt=""  className={s.mobileImg} />

                        <h4 className="text-info">
                          EEFI/USDC LP Tokens
                        </h4>
                        </span>
                      </Link>
                    </td>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      {/* <Link to="/app/home/vault-eefi"> */}
                      <Link to="/app/home/vault-detail/1">
                        <p className={"d-flex  align-items-center fw-bold"}>
                          <img src={p2} height={80} width={80} alt=""  className={s.mobileImg} />
                        </p>
                        <h5 className="text-info" >
                        EEFI/USDC<br></br>LP Tokens
                        </h5>
                      </Link>
                      {/* <Link to="/app/home/vault-eefi"> */}
                      <Link to="/app/home/vault-detail/1">
                        <p>
                          <Button color="primary" className="mb-md mr-md">Select</Button>
                        </p>
                      </Link>
                    </td>
                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; EEFI/USDC LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                    </td>
                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(lpStakingTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ $ {this.numberWithCommas(lpStakingStaking + lpStakingReward)}
                      </p>
                    </td>
                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; EEFI/USDC LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, USDC
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(lpStakingTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ {this.numberWithCommas(lpStakingStaking + lpStakingReward)}
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
                  <tr key={0}>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-long-1">
                      <Link to="/app/home/vault-detail/2">
                          <span className={"d-flex  align-items-center fw-bold"}>
                          <img src={p3} height={80} width={80} alt="" className={s.mobileImg} />
                          <h4 className="text-info">
                          kMPL
                          </h4>
                          </span>
                      </Link>
                    </td>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-gen-page">
                        <p className={"d-flex  align-items-center fw-bold"}>
                          <img src={p3} height={80} width={80} alt="" className={s.mobileImg} />
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
                    {/* <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
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
                    </td> */}
                    <td width="30%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                    </td>
                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer2TVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ {this.numberWithCommas(pioneer2Staking + pioneer2Reward)}
                      </p>
                    </td>
                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer2TVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp;$ {this.numberWithCommas(pioneer2Staking + pioneer2Reward)}
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
                          <img src={p4} height={80} width={80} alt="" className={s.mobileImg} />
                          <h4 className="text-info">
                          Pioneer NFTs
                          </h4>
                        </span>
                      </Link>
                    </td>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-nfts">
                        <p className={"d-flex  align-items-center fw-bold mb-md mr-md"}>
                          <img src={p4} height={80} width={80} alt="" className={s.mobileImg} />
                        </p>
                        <span className={"d-flex fw-bold mb-md mr-md"}>
                          <h5 className="text-info" style={{margin: "auto"}}>
                            Pioneer <br />NFTs
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
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer1ATVL + pioneer1BTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; $ {this.numberWithCommas(pioneer1AStaking + pioneer1BStaking + pioneer1AReward + pioneer1BReward)}
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
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer1ATVL + pioneer1BTVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; $ {this.numberWithCommas(pioneer1AStaking + pioneer1BStaking + pioneer1AReward + pioneer1BReward)}
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
                      <Link to="/app/home/vault-detail/5">
                        <span className={"d-flex  align-items-center fw-bold"}>
                        <img src={p7} height={80} width={80} alt="" className={s.mobileImg} />
                        <h4 className="text-info">
                        kMPL/ETH LP Tokens
                        </h4>
                        </span>
                      </Link>
                    </td>
                    <td width="35%" className=" pl-0 fw-thin table-vaults-short-1">
                      <Link to="/app/home/vault-detail/5">
                        <p className={"d-flex  align-items-center fw-bold mb-md mr-md"}>
                        <img src={p7} height={80} width={80} alt="" className={s.mobileImg} />
                        </p>
                        <h5 className="text-info" >
                        kMPL/ETH <br></br>LP Tokens
                        </h5>
                      </Link>
                      <Link to="/app/home/vault-detail/5">
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
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                    </td>
                    <td width="25%" className={"pl-0 fw-thin table-vaults-long-1"}>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer3TVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; $ {this.numberWithCommas(pioneer3Staking + pioneer3Reward)}
                      </p>
                    </td>
                    <td width="30%" className={"pl-0 fw-thin table-vaults-short-1"}>
                      <p className={"d-flex  align-items-center text-info "}>
                        <strong>Deposit:</strong>&nbsp; kMPL/ETH LP Tokens
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong> Earn:</strong> &nbsp;EEFI, ETH
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>TVL: </strong> &nbsp; $ {this.numberWithCommas(pioneer3TVL)}
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>APY: </strong>&nbsp; N/A
                      </p>
                      <p className={"d-flex  align-items-center text-info"}>
                        <strong>Your Balance: </strong>&nbsp; $ {this.numberWithCommas(pioneer3Staking + pioneer3Reward)}
                      </p>
                    </td>

                    <td width="10%" className={"pl-0 fw-normal table-vaults-long-1"}>
                      <Link to="/app/home/vault-detail/5">
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
                  <p style={{ fontWeight: 700 }}>Total Value Locked: All Vaults</p>
                </Row>
              }
            >
              <Row style={{ marginTop: -36 }}>
                <Col sm={12}>
                  <ApexChart
                    className="sparkline-chart"
                    series={chartData.series}
                    options={chartData.options}
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
    eefi_price: store.blockchain.eefi_price,
    ampl_price: store.blockchain.ampl_price,
    eth_price: store.blockchain.eth_price,
    vault: store.vault,
    vaultValues: store.blockchain.vaultValues,
    history: store.blockchain.history_tvl
  };
}

export default withRouter(connect(mapStateToProps)(VaultSummary));
