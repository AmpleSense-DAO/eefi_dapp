import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popover, PopoverBody, PopoverHeader, Alert } from "reactstrap";

import {
  Button,
  ButtonToolbar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

import Rating from "../product/components/Rating/Rating";
import s from "./Management.module.scss";

import {
  getProductsRequest,
  deleteProductRequest,
} from "../../actions/products";
import Loader from "../../components/Loader";

class Management extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: [],
  };

  state = {
    popovers: {},
    promoAlert: false,
  };

  constructor() {
    super();
    this.apiFormatter = this.apiFormatter.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getProductsRequest());
    setTimeout(() => {
      this.showPromoAlert();
    }, 100);
  }

  showPromoAlert() {
    this.setState({ promoAlert: true });
  }

  imageFormatter(cell) {
    return <img src={cell} alt="..." className={s.image} title="image" />;
  }

  ratingFormatter(cell) {
    return <Rating rating={parseFloat(cell)} />;
  }

  titleFormatter(cell, row) {
    return cell ? (
      <Link to={"/app/ecommerce/product/" + row.id}>
        {cell[0].toUpperCase() + cell.slice(1)}
      </Link>
    ) : (
      ""
    );
  }

  deleteProduct(id) {
    this.props.dispatch(
      deleteProductRequest({
        id,
        history: this.props.history,
      })
    );
  }

  togglePopover(id) {
    let newState = { ...this.state };
    if (!this.state.popovers[id]) {
      newState.popovers[id] = true;
    } else {
      newState.popovers[id] = !newState.popovers[id];
    }
    this.setState(newState);
  }

  apiFormatter(cell, row) {
    return (
      <ButtonToolbar className={"d-flex flex-column"}>
        <Button
          color="info"
          size="xs"
          style={{
            backgroundColor: "transparent",
            color: "#9FDBE9",
            display: "block",
          }}
          onClick={() =>
            this.props.history.push("/app/ecommerce/management/" + row.id)
          }
        >
          <span className="d-none d-md-inline-block">Edit</span>
          <span className="d-md-none">
            <i className="la la-edit" />
          </span>
        </Button>
        <Button
          id={"popoverDelete_" + row.id}
          style={{ backgroundColor: "transparent", color: "#FF7769" }}
          color="danger"
          size="xs"
        >
          {this.props.isDeleting && this.props.idToDelete === row.id ? (
            <Loader size={14} />
          ) : (
            <span>
              <span className="d-none d-md-inline-block">Delete</span>
              <span className="d-md-none">
                <i className="la la-remove" />
              </span>
            </span>
          )}
        </Button>
        <Popover
          className="popover-danger"
          target={"popoverDelete_" + row.id}
          placement="top"
          isOpen={this.state.popovers[row.id]}
          toggle={() => {
            this.togglePopover(row.id);
          }}
        >
          <PopoverHeader className="px-5">Are you sure?</PopoverHeader>
          <PopoverBody className="px-5 d-flex justify-content-center">
            <ButtonToolbar>
              <Button
                color="success"
                size="xs"
                onClick={() => {
                  this.deleteProduct(row.id);
                }}
              >
                Yes
              </Button>
              <Button
                color="danger"
                size="xs"
                onClick={() => {
                  this.togglePopover(row.id);
                }}
              >
                No
              </Button>
            </ButtonToolbar>
          </PopoverBody>
        </Popover>
      </ButtonToolbar>
    );
  }

  renderSizePerPageDropDown = (props) => {
    const limits = [];
    props.sizePerPageList.forEach((limit) => {
      limits.push(
        <DropdownItem
          key={limit}
          onClick={() => props.changeSizePerPage(limit)}
        >
          {limit}
        </DropdownItem>
      );
    });

    return (
      <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
        <DropdownToggle color="default" caret>
          {props.currSizePerPage}
        </DropdownToggle>
        <DropdownMenu>{limits}</DropdownMenu>
      </Dropdown>
    );
  };

  createNewProduct() {
    this.props.history.push("/app/ecommerce/management/create");
  }

  render() {
    /*const options = {
      sizePerPage: 10,
      paginationSize: 3,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
    }; */

    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    isReceiving: state.products.isReceiving,
    isDeleting: state.products.isDeleting,
    idToDelete: state.products.idToDelete,
  };
}

export default withRouter(connect(mapStateToProps)(Management));
