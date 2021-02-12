import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  NavItem,
  NavLink,
} from "reactstrap";
import cx from "classnames";
import { NavbarTypes } from "../../reducers/layout";
import Notifications from "../Notifications";
import { logoutUser } from "../../actions/user";
import chroma from "chroma-js";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";

import userAvatar from "../../images/userAvatar.png";
import search from "../../images/search.svg";
import notify from "../../images/notify.svg";
import lightNotify from "../../images/light-notify.svg";
import messages from "../../images/messages.svg";
import lightMessages from "../../images/messages-filled.svg";
import arrowActive from '../../images/Arrow 6.svg'
import arrowUnactive from '../../images/Arrow 5.svg'

// light navbar icons
import messagesLightTheme from '../../images/theme-icons/light-navbar/message.svg'
import notifyLightTheme from '../../images/theme-icons/light-navbar/notification.svg'
import lightSearch from '../../images/theme-icons/light-navbar/search.svg'

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class


import { WalletConnect, ProviderContext } from '../Wallet/walletConnect'


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
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);

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
      arrowImg: arrowUnactive
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

  toggleAccount() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
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
    const { focus } = this.state;
    const { navbarType, navbarColor, openUsersList } = this.props;

  //  const user = JSON.parse(localStorage.getItem("user") || {});

  //  const firstUserLetter = (user.name || user.email || "P")[0].toUpperCase();

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
        <NavItem className={"d-md-down-block d-md-none ml-auto"}>
          <img
            src={search}
            alt="search"
            width="24px"
            height="23px"
            style={{ marginRight: 12 }}
          />
        </NavItem>
        <button className={`btn btn-bordered ml-auto `} onMouseOver={() => this.changeArrowImg()} onMouseLeave={() => this.changeArrowImgOut()}>
         <WalletConnect>
            </WalletConnect>
            </button>



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
  };
}

export default withRouter(connect(mapStateToProps)(Header));
