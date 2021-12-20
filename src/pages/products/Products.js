import React, { Component } from "react";
import PropTypes from "prop-types";

import { Range, createSliderWithTooltip } from "rc-slider";
import { getProductsRequest } from "../../actions/products";
import { withRouter } from "react-router";
import { connect } from "react-redux";


class ProductList extends Component {
  static propTypes = {
    products: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: [],
  };

  state = {
    isModalActive: false,
    modalId: null,
    activeGrid: true,
    activeList: false,
    localProducts: [],
  };

  openModal(id) {
    this.setState({ isModalActive: true, modalId: id });
  }

  closeModal = () => {
    this.setState({ isModalActive: false, modalId: null });
  };

  toggleGrid = () => {
    this.setState({
      activeGrid: !this.state.activeGrid,
      activeList: !this.state.activeList,
    });
  };

  forceUpdate() {
    return this.setState({});
  }

  componentDidMount() {
    this.props.dispatch(getProductsRequest());
    if (this.props.products.length !== 0) {
      this.setState({ localProducts: this.props.products });
    }
    //window.addEventListener("resize", this.forceUpdate.bind(this));
  }

  componentDidUpdate(prevProps) {
    if (this.props.products !== prevProps.products) {
      this.setState({ localProducts: this.props.products });
    }
  }

  render() {
    const productFilter = (e) => {
      let products = [];
      this.props.products.forEach((c) => {
        if (
          c.title.toLowerCase().includes(e.currentTarget.value.toLowerCase())
        ) {
          products.push(c);
        }
        return;
      });
      this.setState({
        localProducts: products,
      });
    };

    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
  };
}

export default withRouter(connect(mapStateToProps)(ProductList));
