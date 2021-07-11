import React from "react";

import s from "./Dashboard.module.scss";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.forceUpdate = this.forceUpdate.bind(this);
    this.updateChartsColor = this.updateChartsColor.bind(this);
  }
  state = {
  };

  componentDidMount() {
    window.addEventListener("resize", this.forceUpdate.bind(this));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  forceUpdate() {
    return this.setState({});
  }

  render() {
    return (
      <div className={s.root}>
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

export default withRouter(connect(mapStateToProps)(Dashboard));
