import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Button, Form, FormGroup, Label, Col } from "reactstrap";
import Web3 from "web3";
import Select from "react-select";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Authereum from "authereum";
import { Navbar, NavItem, NavLink } from "reactstrap";

import cx from "classnames";
import { NavbarTypes } from "../../reducers/layout";
import { toggleSidebar, openSidebar, closeSidebar, changeActiveSidebarItem } from "../../actions/navigation";

import arrowActive from "../../images/Arrow 6.svg";
import arrowUnactive from "../../images/Arrow 5.svg";

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class

import { loginUser, loginError, logoutUser } from "../../actions/user";

// import gasImage from '../../images/icons/gas-icon.png';
import gasSmallImg from "../../images/icons/gas-icon-24.png";
import mobileLogo from "../../images/mobilelogo.png";
// import { stat } from "fs-extra";

const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const erc20Abi = require("../../contracts/ERC20.json");
const TokenDistributorAbi = require("../../contracts/TokenDistributor.json");
const { CONTRACT_ADDRESSES } = require("../../components/Blockchain/Updater.js");

const providerOptions = {
  /*injected: {
      display: {
        logo: "data:image/gif;base64,INSERT_BASE64_STRING",
        name: "Injected",
        description: "Connect with the provider in your Browser"
      },
      package: null
    },*/
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "4372ea8a08ea4629bf10104f4c86a900", // required
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: "FORTMATIC_KEY", // required
    },
  },
  mewconnect: {
    package: MewConnect, // required
    options: {
      infuraId: "4372ea8a08ea4629bf10104f4c86a900", // required
    },
  },
  authereum: {
    package: Authereum, // required
  },
};

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  // cacheProvider: true, // optional
  providerOptions, // required
});

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleMessages = this.toggleMessages.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);

    // console.log('gas_price_fastest', gas_price_fastest, 'gas_price_fast', gas_price_fast);
    // const { gas_price_fastest } = this.props;
    // const { gas_price_fast } = this.props;
    // const { gas_price_average } = this.props;

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      messagesOpen: false,
      accountOpen: false,
      notificationsTabSelected: 1,
      focus: false,
      showNewMessage: false,
      hideMessage: true,
      run: true,
      arrowImg: arrowUnactive,
      selectDefaultData: [
        { value: "Average", label: "0", rating: "safe" },
        { value: "Fast", label: "0", rating: "good" },
        { value: "Fastest", label: "0", rating: "quick" },
      ],
      defaultData: { value: "Fast", label: "0", rating: "good" },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.gas_price_fastest !== state.gas_price_fastest && props.gas_price_fastest !== "undefined" && props.gas_price_fastest !== "0") {
      return {
        selectDefaultData: [
          { value: "Average", label: `${props.gas_price_average}`, rating: "safe" },
          { value: "Fast", label: `${props.gas_price_fast}`, rating: "good" },
          { value: "Fastest", label: `${props.gas_price_fastest}`, rating: "quick" },
        ],
      };
    }
    if (props.gas_price_fast !== state.gas_price_fast && props.gas_price_fast !== "undefined" && props.gas_price_fast !== "0") {
      return {
        selectDefaultData: [
          { value: "Average", label: `${props.gas_price_average}`, rating: "safe" },
          { value: "Fast", label: `${props.gas_price_fast}`, rating: "good" },
          { value: "Fastest", label: `${props.gas_price_fastest}`, rating: "quick" },
        ],
      };
    }
    if (props.gas_price_average !== state.gas_price_average && props.gas_price_average !== "undefined" && props.gas_price_average !== "0") {
      return {
        selectDefaultData: [
          { value: "Average", label: `${props.gas_price_average}`, rating: "safe" },
          { value: "Fast", label: `${props.gas_price_fast}`, rating: "good" },
          { value: "Fastest", label: `${props.gas_price_fastest}`, rating: "quick" },
        ],
      };
    }
    return null;
  }

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  toggleMessages() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  doLogin() {
    web3Modal
      .connect()
      .then((provider) => {
        let web3 = new Web3(provider);
        web3.eth.getAccounts().then((accounts) => {
          this.props.dispatch(loginUser(web3, accounts[0]));
        });

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          this.props.dispatch(loginUser(web3, accounts[0]));
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
          console.log(chainId);
        });

        // Subscribe to provider connection
        provider.on("connect", (info) => {
          console.log(info);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
          this.props.dispatch(logoutUser());
        });
      })
      .catch((err) => {
        this.props.dispatch(loginError(err));
      });
  }
  componentDidMount() {
    var self = this;
    if(window.ethereum) {
      let web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        var account = accounts[0];
        if (!account) {
          self.props.dispatch(logoutUser());
        } else if (account !== self.props.account) {
          self.props.dispatch(loginUser(web3, account));
        }
      });
    }
  }
  changeArrowImg() {
    this.setState({
      arrowImg: arrowActive,
    });
  }

  changeArrowImgOut() {
    this.setState({
      arrowImg: arrowUnactive,
    });
  }

  getAMPL() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getAMPL().send({ from: this.props.account });
  }

  getKMPL() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getKMPL().send({ from: this.props.account });
  }

  getEEFI() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getEEFI().send({ from: this.props.account });
  }

  getKMPLETHLP() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getKMPLETHLP().send({ from: this.props.account });
  }

  getEEFIETHLP() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getEEFIETHLP().send({ from: this.props.account });
  }

  getZNFT() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getToken1().send({ from: this.props.account });
  }

  getANFT() {
    const contract = new this.props.web3.eth.Contract(TokenDistributorAbi.abi, CONTRACT_ADDRESSES.TOKEN_DISTRIBUTOR);
    contract.methods.getToken2().send({ from: this.props.account });
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // tables/non-tables
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem("staticSidebar", "false");
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem("staticSidebar", "true");
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  handleChange(value) {
    this.setState({
      defaultData: value,
    });
  }

  determineIndex(options, choice) {
    var index = 0;
    options.forEach((option, i) => {
      if (option.value === choice.value) {
        index = i;
      }
    });

    return index;
  }

  render() {
    // const { focus } = this.state;
    const { navbarType, navbarColor, account } = this.props;
    // const { gas_price_fastest } = this.props;
    // const { gas_price_fast } = this.props;
    // const { gas_price_average } = this.props;
    var index = this.determineIndex(this.state.selectDefaultData, this.state.defaultData);

    return (
      <Navbar className={`${s.root} ${cx({ [s.rootLight]: navbarColor === "#FFFFFF" })} ${navbarType === NavbarTypes.FLOATING ? s.navbarFloatingType : ""}`}>
        <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
          <NavLink className="ml-2 pr-4 pl-3" id="toggleSidebar" onClick={this.toggleSidebar}>
            {/* <i
              className={`la la-bars`}
              style={{ color: "#000" }}
            /> */}
            <img src={mobileLogo} alt="" />
          </NavLink>
        </NavItem>
        <Button id="button-connected" className={`btn ${s.fullVersionBtn}`} onClick={this.doLogin}>
          {account ? account.substr(0, 8) + "..." : "Connect Wallet"}
        </Button>
        {/* <Button id="getampl" onClick={() => {this.getAMPL()}}>DEBUG Get AMPL</Button>
        <Button id="getkmpl" onClick={() => {this.getKMPL()}}>DEBUG Get KMPL</Button>
        <Button id="geteefi" onClick={() => {this.getEEFI()}}>DEBUG Get EEFI</Button>
        <Button id="getkmpleth" onClick={() => {this.getKMPLETHLP()}}>DEBUG Get KMPL/ETH LP</Button>
        <Button id="geteefieth" onClick={() => {this.getEEFIETHLP()}}>DEBUG Get EEFI/ETH LP</Button>
        <Button id="geteefieth" onClick={() => {this.getANFT()}}>DEBUG Get ANFT</Button>
        <Button id="geteefieth" onClick={() => {this.getZNFT()}}>DEBUG Get ZNFT</Button> */}
        {/* <div className={s.gasStation}>
          <img className={s.gasImg} src={gasImage} alt="gas"></img>
          <p></p>
        </div> */}
        <Form className={`form-label-left ${s.form}`}>
          <FormGroup row className={s.formGroup}>
            <Label className={`right ${s.gasLabel}`}>
              <img src={gasSmallImg} alt="" className={"mr-31"} />
            </Label>
            <Col className={s.select1}>
              <Select id="gasGroup" className={s.selectCustomization} options={this.state.selectDefaultData} defaultValue={this.state.selectDefaultData[1]} value={this.state.selectDefaultData[index]} onChange={(value) => this.handleChange(value)} />
            </Col>
          </FormGroup>
        </Form>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
    web3: store.auth.web3,
    account: store.auth.account,
    gas_price_fastest: store.blockchain.gas_price_fastest,
    gas_price_fast: store.blockchain.gas_price_fast,
    gas_price_average: store.blockchain.gas_price_average,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
