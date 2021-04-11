import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Button } from "reactstrap";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import MewConnect from "@myetherwallet/mewconnect-web-client";
import Authereum from "authereum";
import {
  Navbar,
  NavItem,
  NavLink,
} from "reactstrap";

import cx from "classnames";
import { NavbarTypes } from "../../reducers/layout";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";

import arrowActive from '../../images/Arrow 6.svg'
import arrowUnactive from '../../images/Arrow 5.svg'

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class

import { loginUser, loginError } from "../../actions/user";

const AmplesenseVaultAbi = require("../../contracts/AmplesenseVault.json");
const erc20Abi = require("../../contracts/ERC20.json");
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
      infuraId: "4372ea8a08ea4629bf10104f4c86a900" // required
      }
  },
  fortmatic: {
      package: Fortmatic, // required
      options: {
          key: "FORTMATIC_KEY" // required
      }
  },
  mewconnect: {
      package: MewConnect, // required
      options: {
        infuraId: "4372ea8a08ea4629bf10104f4c86a900" // required
      }
  },
  authereum: {
      package: Authereum // required
  }
};

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  // cacheProvider: true, // optional
  providerOptions // required
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
    this.doLoginLocal = this.doLoginLocal.bind(this);
    this.doAdd90Days = this.doAdd90Days.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);
    this.doRebase = this.doRebase.bind(this);

  //  console.log('gas_price_fastest', gas_price_fastest, 'gas_price_fast', gas_price_fast)
    const { gas_price_fastest } = this.props;
    const { gas_price_fast } = this.props;
    const { gas_price_average } = this.props;
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
        { value: 'Average', label:  `${gas_price_average}`, rating: 'safe' },
        { value: 'Fast', label:  `${gas_price_fast}`, rating: 'good' },
        { value: 'Fastest', label: `${gas_price_fastest}`, rating: 'quick' },
      ] 
    };
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
    web3Modal.connect().then(provider => {
      let web3 = new Web3(provider);
      web3.eth.getAccounts().then(accounts => {
        this.props.dispatch(loginUser(web3, accounts[0]));
      })
      
    }).catch(err => {
      this.props.dispatch(loginError(err));
    });
  }

  doLoginLocal() {
    let web3 = new Web3("ws://127.0.0.1:8545/");
    web3.eth.getAccounts().then(accounts => {
      this.props.dispatch(loginUser(web3, accounts[0]));
    })
  }

  doAdd90Days() {
    this.props.web3.currentProvider.send({
      jsonrpc: "2.0", 
      method: "evm_increaseTime", 
      params: [7776000],
      id: 1
    }, res => {
      this.props.web3.currentProvider.send({
        jsonrpc: "2.0", 
        method: "evm_mine", 
        params: [],
        id: 2
      }, res => console.log)
  });
 }

 doRebase() {
  const ampleSenseVault = new this.props.web3.eth.Contract(AmplesenseVaultAbi.abi, CONTRACT_ADDRESSES.AMPLE_SENSE_VAULT);
  const ampl = new this.props.web3.eth.Contract(erc20Abi.abi, CONTRACT_ADDRESSES.AMPLE_CONTRACT);
  ampl.methods.rebase("500").send({from: this.props.account}).then(receipt => {
    ampleSenseVault.methods.rebase().send({from: this.props.account}).then(receipt => {
    }).catch(err => console.log)
  })
 }

  changeArrowImg() {
    this.setState({
      arrowImg: arrowActive
    })
  }

  changeArrowImgOut() {
    this.setState({
      arrowImg: arrowUnactive
    })
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
  render() {

    // const { focus } = this.state;
    const { navbarType, navbarColor, account } = this.props;
    const { gas_price_fastest } = this.props;
    const { gas_price_fast } = this.props;
    const { gas_price_average } = this.props;

    this.setState = {
      selectDefaultData: [
        { value: 'Average', label:  `${gas_price_average}`, rating: 'safe' },
        { value: 'Fast', label:  `${gas_price_fast}`, rating: 'good' },
        { value: 'Fastest', label: `${gas_price_fastest}`, rating: 'quick' },
      ]
    };


    return (
      <Navbar
        className={`${s.root} ${cx({[s.rootLight]: navbarColor === '#FFFFFF'})} ${
          navbarType === NavbarTypes.FLOATING ? s.navbarFloatingType : ""
        }`}
      >

    <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
          <NavLink
            className="ml-2 pr-4 pl-3"
            id="toggleSidebar"
            onClick={this.toggleSidebar}
          >
            <i
              className={`la la-bars`}
              style={{ color: "#000" }}
            />
          </NavLink>
        </NavItem>
       
        <Button id="button-connected" className={`btn  ml-auto ${s.fullVersionBtn}`} onClick={this.doLogin}>{account? account.substr(0,8) + "...": "Wallet Connect"}</Button>
 
       {/* <Form className="form-label-left" >
          <FormGroup row>
             <Label  md="4"  className={"right"}>
               <img src={p1} alt="" className={"mr-3"} />
             </Label>

            <Col md="8" className={s.select1}>
              <Select 
                id="gasGroup"
                className="selectCustomization"
                options={this.state.selectDefaultData}
                defaultValue={this.state.selectDefaultData[1]}
                selected={this.state.selectDefaultData[1]}
              />
            </Col>
         </FormGroup>  
        </Form>
         */ }    
  <div>
        <Button id="button-connected" className={`btn  ml-auto ${s.fullVersionBtn}`} onClick={this.doLoginLocal}>{account? account.substr(0,8) + "...": "Wallet Connect Testnet"}</Button>
        <Button id="button-time" className={`btn  ml-auto ${s.fullVersionBtn}`} onClick={this.doAdd90Days}>Add 90 days</Button>
        <Button id="button-time" className={`btn  ml-auto ${s.fullVersionBtn}`} onClick={this.doRebase}>Rebase</Button>
  </div>
        

      <p align="right">
            
       </p>            
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
