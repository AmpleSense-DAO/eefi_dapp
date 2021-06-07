/* eslint-disable */
import React from 'react';


import {
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Table,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  UncontrolledDropdown
} from 'reactstrap';
import classnames from 'classnames';

import { withRouter } from "react-router";
import { connect } from "react-redux";

import Widget from "../../components/Widget";
import VaultDetail from "../../pages/vault-detail/VaultDetail";
import { setVaultType } from "../../actions/blockchain";
import PropTypes from "prop-types";

import s from './VaultNFTs.module.scss'

//tokens
import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";



class VaultNFTs extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleAccordionFirst = this.toggleAccordionFirst.bind(this);
    this.state = {
      activeFirstTab: 'tab11',
      activeSecondTab: 'tab22',
      activeThirdTab: 'tab31',
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      accordionSecondContent: [{
        title: 'Collapsible Group Item', body: ` Get base styles and flexible support for collapsible components like accordions and navigation.
          Using the collapse plugin, we built a simple accordion by extending the panel component.`,
      }, {
        title: 'Normal Text Insertion', body: `
        Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's very
              controversial point. I think the opposite actually. Everyone knows what is lore ipsum
              - it is easy to understand if text is lore ipsum. You'll automatically skip -
              because you know - it's just non-informative stub. But what if there some text like
              this one? You start to read it! But the goal of this text is different. The goal is
              the example. So a bit of Lore Ipsum is always very good practice. Keep it in mind!`,
      }, {
        title: 'Check It',
        body: ' Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.',
      }],

      accordionFirstContent: [{
        title: 'Collapsible Group Item', body: ` Get base styles and flexible support for collapsible components like accordions and navigation.
          Using the collapse plugin, we built a simple accordion by extending the panel component.`,
      }, {
        title: 'Random from the Web', body: `
        <p><span class="fw-semi-bold">Light Blue</span> - is a next generation admin template based
        on the latest Metro design. There are few reasons we want to tell you, why we have created it:
        We didn't like the darkness of most of admin templates, so we created this light one.
        We didn't like the high contrast of most of admin templates, so we created this unobtrusive one.
        We searched for a solution of how to make widgets look like real widgets, so we decided that
        deep background - is what makes widgets look real.
        </p>
        <p class="no-margin text-muted"><em>- Some One</em></p>`,
      }, {
        title: 'Check It',
        body: ' Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.',
      }],
    };
  }

  componentDidMount() {
    this.props.dispatch(setVaultType(3));
  }

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.props.dispatch(setVaultType(tab == 'tab11'? 3 : 4));
      this.setState({
        activeFirstTab: tab,
      });
    }
  }

  toggleAccordionFirst(id) {
    const arr = [];
    arr.length = this.state.accordionFirst.length;
    arr.fill(false);
    arr[id] = !this.state.accordionFirst[id];
    this.setState({
      accordionFirst: arr,
    });
  }

  toggleAccordionSecond(id) {
    const arr = [];
    arr.length = this.state.accordionSecond.length;
    arr.fill(false);
    arr[id] = !this.state.accordionSecond[id];
    this.setState({
      accordionSecond: arr,
    });
  }

  render() {
    return (
      <div>
        <div className={s.headerImg}>
          <img src="/tables/media/apollo_cropped_edited_sm.png" height={80} width={80} alt="" className={s.mobileImg} />
          <h2 className={s.headerText}>
            Pioneer Fund Vault I: NTFs
          </h2>
        </div>
        {/* Tabs */}
        <Row>
          <Col md="12" xs="12">
            <div className="clearfix">
              <Nav tabs className={`float-left ${s.coloredNav} shadow`}>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFirstTab === 'tab11' })}
                    onClick={() => { this.toggleFirstTabs('tab11'); }}
                  >
                    <span>Manage Zeus NFTs</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFirstTab === 'tab12' })}
                    onClick={() => { this.toggleFirstTabs('tab12'); }}
                  >
                    <span>Manage Apollo NFTs</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            {/* tab content
            <div className={s.nftTitle}>
              {this.props.account && <VaultDetail key={""+this.props.vault_type} forcedId={this.props.vault_type}/>}
            </div> */}
            <TabContent className='mb-lg shadow' activeTab={this.state.activeFirstTab}>
              <TabPane tabId="tab11">
                {this.props.account && <VaultDetail forcedId={2}/> }
              </TabPane>
              <TabPane tabId="tab12">
                {this.props.account && <VaultDetail forcedId={4}/> }
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>);
  }

}

function mapStateToProps(store) {
  return {
    web3: store.auth.web3,
    account: store.auth.account,
    staking_token_balance: store.blockchain.staking_token_balance,
    staking_token_withdraw: store.blockchain.staking_token_withdraw,
    claimable: store.blockchain.claimable,
    kmpl_price: store.blockchain.kmpl_price,
    reward: store.blockchain.reward,
    deposits: store.blockchain.deposits,
    withdrawals: store.blockchain.withdrawals,
    claim_tx: store.blockchain.claim_tx,
    vault_type: store.blockchain.vault_type
  };
}

export default withRouter(connect(mapStateToProps)(VaultNFTs));
