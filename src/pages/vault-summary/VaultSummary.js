import React from "react";
import { Row, Col, Table } from "reactstrap";

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
import stocksDownImg from "../../images/stocksDown.svg";

import { chartData } from "./chartsMock";

import Widget from "../../components/Widget";

import s from "./VaultSummary.module.scss";
import ApexChart from "react-apexcharts";

// people
import p1 from "../../images/people/p1.png";
import p2 from "../../images/people/p2.png";
import p3 from "../../images/people/p3.png";
import p4 from "../../images/people/p4.png";
import p5 from "../../images/userAvatar.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
      colors: ["rgba(255, 205, 101, .2)", "rgba(0,0,0,0)"],
      type: "solid",
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
    }
  }

  componentDidMount() {
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
          this.updateChartsColor("success")
              break;
        case "info":
          this.updateChartsColor("info")
              break;
      }
    }
  }

  forceUpdate() {
    return this.setState({});
  }

  render() {
    return (
      <div className={s.root}>
        <Row>
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>TVL</p>}
              customDropDown
            >

              <Row className={`justify-content-between mt-3`} noGutters>

                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>$ 872 410</h3>
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
          <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>Your Portfolio</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>$ 73 440</h3>
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
     
       <Col xl={4}>
            <Widget
              title={<p style={{ fontWeight: 700 }}>kMPL Price</p>}
              customDropDown
            >
              <Row className={`justify-content-between mt-3`} noGutters>
                <Col sm={8} className={"d-flex align-items-center"}>
                  <h3 className={"fw-semi-bold mb-0"}>$ 41.05</h3>
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
    
       <Row>
          <Col sm={12}>
            <Widget
              customDropDown
              
            >
                <Table className="table-hover" responsive>


                <thead>
                  <tr>
                    <th key={0} scope="col" className={"pl-0"}>
                      Asset
                    </th>
                    <th key={1} scope="col" className={"pl-0"}>
                      Vault Strategy
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      TVL
                    </th>
                    <th key={3} scope="col" className={"pl-0"}>
                      Staked Balance
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="text-dark">
                  <tr key={0}>
                    <td className="fw-thin pl-0 fw-thin">
                      <p className={"fw-bold"}>
                      <img src={p1} alt="" className={"mr-3"} />AMPL
                      </p>
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      <p>
                      Stake AMPL, Earn EEFI, ETH
                      </p>
            
                    </td>
                    <td className={"pl-0 fw-thin"}>$ 10,434,565</td>
                    <td className={"pl-0 fw-normal"}>$ 8400</td>
                    
                  </tr>
                  <tr key={1}>
                    <td className="fw-normal pl-0 fw-thin">
                       <p className={"fw-bold"}>
                      <img src={p1} alt="" className={"mr-3"} />EEFI / ETH
                      </p>
                    </td>
                    <td className={"pl-0 fw-thin"}>
                     
                      <p>
                        Stake EEFI/ETH LP Tokens, Earn EEFI, ETH
                      </p>
                      
                     

                    </td>
                    <td className={"pl-0 fw-thin"}>$ 2,464,565</td>
                    <td className={"pl-0 fw-normal"}>$ 46000</td>
                    
                  </tr>
                  <tr key={2}>
                    <td className="fw-normal pl-0 fw-thin">
                       <p className={"fw-bold"}>
                      <img src={p1} alt="" className={"mr-3"} />kMPL
                      </p>
                    </td>
                    <td className={"pl-0 fw-thin"}>
                   
                      <p >
                        Stake kMPL, Earn EEFI, ETH
                      </p>
                      

                    </td>
                    <td className={"pl-0 fw-thin"}>$ 1,434,565</td>
                    <td className={"pl-0 fw-normal"}>$ 1300</td>
                    
                  </tr>
                  <tr key={3}>
                    <td className="fw-normal pl-0 fw-thin">
                      
                       <p className={"fw-bold"}>
                      <img src={p1} alt="" className={"mr-3"} />Pioneer NFTs
                      </p>
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      <p>
                        Stake Zeuz Apollo NFTs, Earn AMPL
                      </p>
                      
                   
                    </td>
                    <td className={"pl-0 fw-thin"}>$ 44,434,665</td>
                    <td className={"pl-0 fw-normal"}>$ 880</td>
                    
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
                    <p style={{ fontWeight: 700 }}>Total Value Locked </p>
                  </Col>
                  <Col xs={12} sm={7}>
                    <div className="chart-legend" />
                  </Col>
                </Row>
              }
              customDropDown
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
    sidebarColor: store.layout.sidebarColor,
    dashboardColor: store.layout.dashboardTheme,
  };
}

export default withRouter(connect(mapStateToProps)(VaultSummary));
