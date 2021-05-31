import React from "react";
import { Row,
         Col,
         Table
       } from "reactstrap";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Widget from "../../components/Widget";
import jwt from "jsonwebtoken";
import s from './Landing.module.scss';
import config from "../../config";

//tokens
import p1 from "../../images/tokens/EEFI-animation-updated.gif";
// import p2 from "../../images/tokens/eefi_token_logo.png";
import p3 from "../../images/tokens/connected_white.png";
import p4 from "../../images/tokens/governance_white.png";
// import p5 from "../../images/tokens/ethereum-eth-logo.svg";
import p6 from "../../images/tokens/system_white.png";



class Landing extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    // We check if app runs with backend mode
    if (!config.isBackend && token) return true;
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
  }

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");
    if (token) {
      // this.props.dispatch(receiveToken(token));
    }
  }


  render() {
    // const { from } = this.props.location.state || {
    //   from: { pathname: "/app" },
    // }; // eslint-disable-line

    return (
      <div className={s.root}>
        <Widget>
          <Row>
              <Col >
                <div  responsive>
                  <div className={s.topLogoSection}>
                    <img height="180px" src={p1} alt="" className={"mr-3 mt-2 top-logo-1"} />
                  </div>
                  <Table  className="table">
                    <tr>
                      <td  width="66%">
                        <div className={"text-info"}  >
                          <div>
                            <span  className={"d-flex "}>&nbsp;
                              <h2 className="display-4 d-flex">
                                Unleash the power of your elastic assets
                              </h2>
                            </span>
                            <span className={"d-flex"} >
                              <h4>
                                Earn token rewards, hedge against negative rebase and more
                              </h4>
                            </span>
                            <br/>
                          </div>
                          <span className={"d-flex align-items-center "} responsive>
                            <Link to="/app/home/vault-summary">
                              <Button color="info" size="lg" className="mb-md mr-sm" responsive>Launch App</Button>
                            </Link>
                          </span>
                        </div>
                      </td>
                      <td width="33%" className={"mr-3 mt-2 left-logo-1"}>
                          &nbsp;&nbsp;&nbsp;<img height="300px" src={p1} alt=""  />
                      </td>
                    </tr>
                  </Table>
                </div>

                <div  className="table-bordered" responsive>
                  <div className={s.middleSection}>
                    <div className={s.middleDiv}>
                      <img height="240" src={p6} alt="" className={"mr-3"} />
                      <h3>A growing ecosystem</h3>
                      <p>Use your elastic assets to tap into a growing number of yield generation strategies,
                        made possible by the rebase.
                      </p>
                    </div>
                    <div className={s.middleDiv}>
                      <img height="240" src={p4} alt="" className={"mr-3"} />
                      <h3>Powered by the community</h3>
                      <p>Vault strategies are approved by holders of the kMPL governance token in exchange for token rewards.
                      </p>
                    </div>
                    <div className={s.middleDiv}>
                      <img height="240" src={p3} alt="" className={"mr-3"} />
                      <h3>Connected to DeFi</h3>
                      <p>Vault strategies are optimized to connect elastic asset holders to the broader DeFi landscape.
                      </p>
                    </div>
                  </div>
                </div>
            </Col>
          </Row>
          <Row>
            <Col >
              <div>
                <div  responsive>
                  <div >
                  <br/>
                    <div key={0}  width="30%" scope="col" className={"pl-0 text-info "} style={{whiteSpace: 'normal'}}>
                      <p  className={"d-flex  "}>&nbsp;
                        <h2 className="display-4 ">
                          An AmpleSense DAO Project
                        </h2>
                      </p>
                      <p  className={"d-flex  align-items-center text-info" } style={{  whiteSpace: 'normal'}}>&nbsp;
                        <h5 className={"text-info " } >
                          The DAO is an independant community powered organization focused on accelerating the global elastic finance ecosystem.
                        </h5>
                      </p>
                      <p className={"d-flex  align-items-center"}>&nbsp;
                        <a target="_blank" href="https://amplesense.io" rel="noopener noreferrer">
                          {/* <h5 className={"text-info white-space : normal" } >Learn about the DAO</h5> */}
                          <Button color="info" size="lg" className="mb-md mr-sm" responsive>Learn about the DAO</Button>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default Landing;
