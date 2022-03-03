import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Dashboard from "../../pages/dashboard";
import VaultSummary from "../../pages/vault-summary";
import VaultDetail from "../../pages/vault-detail";
import BlockchainUpdater from "../Blockchain/Updater";
import VaultGenPage from "../../pages/vault-gen-page";
import VaultEefiPage from "../../pages/vault-eefi";
import VaultNFTs from "../../pages/vault-nfts";

import { SidebarTypes } from "../../reducers/layout";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { openSidebar, closeSidebar, toggleSidebar } from "../../actions/navigation";
import s from "./Layout.module.scss";
import { DashboardThemes } from "../../reducers/layout";
import Helper from "../Helper";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dashboardTheme: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    dashboardTheme: DashboardThemes.DARK,
  };

  constructor(props) {
    super(props);

    // this.handleSwipe = this.handleSwipe.bind(this);
    // this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth < 768) {
      this.props.sidebarOpened && this.props.dispatch(closeSidebar());
    }
    // if (window.innerWidth < 768) {
    //   this.props.dispatch(toggleSidebar());
    // } else if (window.innerWidth >= 768) {
    //   this.props.dispatch(openSidebar());
    // }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }
  render() {
    return (
      <div className={[s.root, "", "flatlogic-one", `dashboard-${this.props.sidebarType === SidebarTypes.TRANSPARENT ? "light" : this.props.sidebarColor}`, `dashboard-${this.props.dashboardTheme !== "light" && this.props.dashboardTheme !== "dark" ? this.props.dashboardTheme : ""}`].join(" ")} onClick={(e) => this.handleCloseSidebar(e)}>
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <Helper />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="fade" timeout={200}>
                  <Switch>
                    <Route path="/app/home" exact render={() => <Redirect to="/app/home/dashboard" />} />
                    <Route path="/app/home/dashboard" exact component={Dashboard} />
                    <Route path="/app/home/vault-summary" exact component={VaultSummary} />
                    <Route path="/app/home/vault-detail/:id" component={VaultDetail} exact />
                    <Route path="/app/home/vault-gen-page" exact component={VaultGenPage} />
                    <Route path="/app/home/vault-eefi" exact component={VaultEefiPage} />
                    <Route path="/app/home/vault-nfts" exact component={VaultNFTs} />
                    <Route render={() => <Redirect to={{ pathname: "/error" }} />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              {this.props.web3 && <BlockchainUpdater key={"" + this.props.vault_type} />}
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
    sidebarType: store.layout.sidebarType,
    sidebarColor: store.layout.sidebarColor,
    account: store.auth.account,
    web3: store.auth.web3,
    vault_type: store.blockchain.vault_type,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
