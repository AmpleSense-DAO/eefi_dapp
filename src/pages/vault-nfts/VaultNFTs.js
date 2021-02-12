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

import Widget from "../../components/Widget";

import s from './VaultNFTs.module.scss'

//tokens
import p1 from "../../images/tokens/ample.png";
import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/kappa_logo_kmpl.png";
import p4 from "../../images/tokens/apollo_cropped_edited_sm.png";
import p5 from "../../images/tokens/ethereum-eth-logo.svg";



class VaultNFTs extends React.Component {

  constructor(props) {
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);
    this.toggleThirdTabs = this.toggleThirdTabs.bind(this);
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
        <p class="no-margin text-muted"><em>- Some One</em></p>
`,
      }, {
        title: 'Check It',
        body: ' Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.',
      }],
    };
  }

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }

  toggleSecondTabs(tab) {
    if (this.state.activeSecondTab !== tab) {
      this.setState({
        activeSecondTab: tab,
      });
    }
  }

  toggleThirdTabs(tab) {
    if (this.state.activeThirdTab !== tab) {
      this.setState({
        activeThirdTab: tab,
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


      <p>
        <h2>
        Pioneer Fund Vault I: NTFs
        </h2>
        </p>
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
            {/* tab content */}

            <TabContent className='mb-lg shadow' activeTab={this.state.activeFirstTab}>
              <TabPane tabId="tab11">
            

      <Row>

         {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Zeus NFT Wallet Balance: 8,569 NFT(s)</p>} 
              >
                <div>
                
                   <FormGroup>
                        <Label for="bar">
                          Amount to Deposit
                        </Label>
                        <InputGroup>
                          <Input type="text" id="bar" />
                          <InputGroupAddon addonType="append">
                            <ButtonGroup>
                              <Button color="ample1"><i className="fa " />25%</Button>
                              <Button color="ample2"><i className="fa " />50%</Button>
                              <Button color="ample3"><i className="fa " />75%</Button>
                              <Button color="ample4"><i className="fa " />100%</Button>
                            </ButtonGroup>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                  
                  <p className={"d-flex align-items-center "} align="center">
                    <Button color="default" size="lg" align="center" className="mb-md mr-sm">Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */}
            <Col md={6} sm={12} xs={12}>
                    <Widget
                title={<p style={{ fontWeight: 700 }}>Zeus NFT Available to Withdraw: 369 NFT(s)</p>} 
              >
                <div>
                
                    <FormGroup>
                        <Label for="bar">
                          Amount to Deposit
                        </Label>
                        <InputGroup>
                          <Input type="text" id="bar" />
                          <InputGroupAddon addonType="append">
                            <ButtonGroup>
                              <Button color="ample1"><i className="fa " />25%</Button>
                              <Button color="ample2"><i className="fa " />50%</Button>
                              <Button color="ample3"><i className="fa " />75%</Button>
                              <Button color="ample4"><i className="fa " />100%</Button>
                            </ButtonGroup>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                 
                  <p className={"d-flex align-items-center "}>
                    <Button color="default" size="lg" className="mb-md mr-sm">Withdraw</Button>
                  </p>
                </div>
              </Widget>
            </Col>
   
        </Row>
   
       <Row>
          <Col sm={12}>
            <Widget>
              <p>
              <h3>Your Staked Balance and Rewards</h3>
            </p>
            <p>
                <Table className="table-hover table-bordered" responsive>
                <thead>
                  <tr>
                    <th key={0} width="50%"  scope="col" className={"pl-0"}>
                      &nbsp;Supply
                    </th>
                   
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Rewards
                    </th>                  
                  </tr>
                </thead>
                <tbody className="text-dark">
                  <tr key={0}>
                    <td className="fw-thin pl-0 fw-thin">
                      <h3>
                        &nbsp;9 Zeus NFT
                      </h3>  
                    </td>
                    
                    <td className={"pl-0 fw-thin"}>
                    
                      <p>
                      <h4>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        
                        &nbsp;9.23 ETH</span>  
                        </h4>
                        </p>
                      <p>
                        <Button color="primary" className="mb-md mr-md">Claim</Button>
                      </p>
                    </td>
                  </tr>   
                </tbody>
              </Table>
              </p>
              <p>
              <h3>Your Deposit History</h3>
              </p>
              <p>
                <Table className="table-hover table-bordered"  responsive>

                <thead>
                  <tr >
                    <th width="50%" key={0} scope="col" className={"pl-0"}>
                      &nbsp;Deposit Date
                    </th>
                    <th width="25%" key={1} scope="col" className={"pl-0"}>
                      &nbsp;Amount
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Tx Link
                    </th>           
                  </tr>
                </thead>
                <tbody className="text-dark">
                 
                  <tr key={0}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/03/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,745 Zeus NFT
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xde...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   
              
                  <tr key={1}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/04/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,445 Zeus NFT
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xf3...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   

                </tbody>
              </Table>
            </p>


            </Widget>
          </Col>
        </Row>

                <div className="clearfix"/>
              </TabPane>

              <TabPane tabId="tab12">
            


   <Row>

         {/* Color options */}
            <Col md={6} sm={12} xs={12}>
              <Widget
                title={<p style={{ fontWeight: 700 }}>Apollo NFT Wallet Balance: 8,569 NFT(s)</p>} 
              >
                <div>
                
                    <FormGroup>
                        <Label for="bar">
                          Amount to Deposit
                        </Label>
                        <InputGroup>
                          <Input type="text" id="bar" />
                          <InputGroupAddon addonType="append">
                            <ButtonGroup>
                              <Button color="ample1"><i className="fa " />25%</Button>
                              <Button color="ample2"><i className="fa " />50%</Button>
                              <Button color="ample3"><i className="fa " />75%</Button>
                              <Button color="ample4"><i className="fa " />100%</Button>
                            </ButtonGroup>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                  
                  <p className={"d-flex align-items-center "} align="center">
                    <Button color="default" size="lg" align="center" className="mb-md mr-sm">Deposit</Button>
                  </p>
                </div>
              </Widget>
            </Col>

            {/* Size variants */}
            <Col md={6} sm={12} xs={12}>
                    <Widget
                title={<p style={{ fontWeight: 700 }}>Apollo NFT Available to Withdraw: 69 NFT(s)</p>} 
              >
                <div>
                
                    <FormGroup>
                        <Label for="bar">
                          Amount to Deposit
                        </Label>
                        <InputGroup>
                          <Input type="text" id="bar" />
                          <InputGroupAddon addonType="append">
                            <ButtonGroup>
                              <Button color="ample1"><i className="fa " />25%</Button>
                              <Button color="ample2"><i className="fa " />50%</Button>
                              <Button color="ample3"><i className="fa " />75%</Button>
                              <Button color="ample4"><i className="fa " />100%</Button>
                            </ButtonGroup>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>

                
                  <p className={"d-flex align-items-center "}>
                    <Button color="default" size="lg" className="mb-md mr-sm">Withdraw</Button>
                  </p>
                </div>
              </Widget>
            </Col>
   
        </Row>
   
       <Row>
          <Col sm={12}>
            <Widget>
            <p>
              <h3>Your Staked Balance and Rewards</h3>
            </p>

            <p>
                <Table className="table-hover table-bordered" responsive>
                <thead>
                  <tr>
                    <th key={0} width="50%"  scope="col" className={"pl-0"}>
                      &nbsp;Supply
                    </th>
                    
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Rewards
                    </th>                  
                  </tr>
                </thead>
                <tbody className="text-dark">
                  <tr key={0}>
                    <td className="fw-thin pl-0 fw-thin">
                      <h3>
                        &nbsp;8,709 Apollo NFT
                      </h3>
                    </td>
                   
                    <td className={"pl-0 fw-thin"}>                       
                      <p>
                      <h4>
                        <img height="30" src={p5} alt="" className={"mr-3"} />
                        <span align="right">
                        &nbsp;9.23 ETH</span>  
                        </h4>
                        </p>
                      <p>
                        <Button color="primary" className="mb-md mr-md">Claim</Button>
                      </p>
                    </td>
                  </tr>   
                </tbody>
              </Table>
              </p>
              <p>
              <h3>Your Deposit History</h3>
              </p>
              <p>
                <Table className="table-hover table-bordered"  responsive>

                <thead>
                  <tr >
                    <th width="50%" key={0} scope="col" className={"pl-0"}>
                      &nbsp;Deposit Date
                    </th>
                    <th width="25%" key={1} scope="col" className={"pl-0"}>
                      &nbsp;Amount
                    </th>
                    <th key={2} scope="col" className={"pl-0"}>
                      &nbsp;Tx Link
                    </th>           
                  </tr>
                </thead>
                <tbody className="text-dark">
                 
                  <tr key={0}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/03/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,745 Apollo NFT
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xde...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   
              
                  <tr key={1}>
                    <td className="fw-normal pl-0 fw-thin">
                      &nbsp;2021/04/15
                    </td>
                    <td className={"pl-0 fw-thin"}>
                      &nbsp;1,445 Apollo NFT
                    </td>
                    <td className={"pl-0 fw-thin"}>
                    &nbsp;0xf3...   <a href="https://www.etherscan.io"  target="_blank">Link</a></td>
                  </tr>   

                </tbody>
              </Table>
            </p>


            </Widget>
          </Col>
        </Row>



              </TabPane>

              <TabPane tabId="tab13">
                <p> If you will think too much it will sink in the swamp of never implemented
                  plans and
                  ideas or will just go away or will be implemented by someone else.</p>
                <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                <p>{`You'll automatically skip - because you know - it's just non-informative stub.
                  But what if there some text like this one?`}</p>
              </TabPane>

              <TabPane tabId="tab14">
                <blockquote className="blockquote-sm blockquote mb-xs">
                  Plan it? Make it!
                </blockquote>
                <p>The same thing is for startups and ideas. If you have an idea right away after
                  it appears
                  in your mind you should go and make a first step to implement it.</p>
              </TabPane>
            </TabContent>

          </Col>

  
        </Row>

   

      </div>);
  }

}

export default VaultNFTs;
