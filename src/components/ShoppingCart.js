import React, { Component } from "react";
import Inventory from "./Inventory";
import Cart from "./Cart";
import { getInventory } from "../APIs/inventoryAPIs";
import {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  checkout,
} from "../APIs/cartAPIs";
import "./ShoppingCart.css";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      cart: [],
      currentPage: 0,
      itemsPerPage: 5,
      totalPage: 0,
    };
  }

  async componentDidMount() {
    const inventoryData = await getInventory();

    const cartData = await getCart();

    const newData = inventoryData.map((e) => {
      return { ...e, number: 0 };
    });

    this.setState({
      ...this.state,
      cart: cartData.reverse(),
      inventory: newData,
      totalPage: Math.ceil(newData.length / this.state.itemsPerPage),
    });
  }

  handleIncrementInventory(id) {
    this.setState({
      ...this.state,
      inventory: this.state.inventory.map((item) => {
        if (item.id === id) {
          return { ...item, number: item.number + 1 };
        } else {
          return item;
        }
      }),
    });
  }

  handleDecrementInventory(id) {
    this.setState({
      ...this.state,
      inventory: this.state.inventory.map((item) => {
        if (item.id === id && item.number > 0) {
          return { ...item, number: item.number - 1 };
        } else {
          return item;
        }
      }),
    });
  }

  async handleAddToCart(id) {
    const InventoryItem = this.state.inventory.filter((e) => {
      return e.id === id;
    });
    const newCartItem = { ...InventoryItem[0] };
    const found = this.state.cart.find((e) => {
      return e.content === newCartItem.content;
    });
    if (found === undefined) {
      const response = await addToCart(newCartItem);
      this.setState({
        ...this.state,
        cart: [response, ...this.state.cart],
      });
    } else {
      newCartItem.number += found.number;
      const response = await updateCart(found.id, newCartItem);
      this.setState({
        ...this.state,
        cart: this.state.cart.map((e) => {
          if (e.id === response.id) {
            return response;
          } else {
            return e;
          }
        }),
      });
    }
  }

  async handleDeleteCartItem(id) {
    await deleteFromCart(id);
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((e) => {
        return e.id !== id;
      }),
    });
  }

  async handleCheckout() {
    await checkout();
    this.setState({
      ...this.state,
      cart: [],
    });
  }

  async handleNextInventoryPage() {
    if (this.state.currentPage < this.state.totalPage - 1) {
      this.setState({
        ...this.state,
        currentPage: this.state.currentPage + 1,
      });
    }
  }
  async handlePrevInventoryPage() {
    if (0 < this.state.currentPage) {
      this.setState({
        ...this.state,
        currentPage: this.state.currentPage - 1,
      });
    }
  }
  async handleSetPage(page) {
    this.setState({
      ...this.state,
      currentPage: page,
    });
  }

  render() {
    return (
      <div className="shopping-container">
        <Inventory
          inventory={this.state.inventory}
          handleIncrement={(id) => this.handleIncrementInventory(id)}
          handleDecrement={(id) => this.handleDecrementInventory(id)}
          handleAddToCart={(id) => this.handleAddToCart(id)}
          currentPage={this.state.currentPage}
          itemsPerPage={this.state.itemsPerPage}
          totalPage={this.state.totalPage}
          handleNextPage={() => this.handleNextInventoryPage()}
          handlePrevPage={() => this.handlePrevInventoryPage()}
          handleSetPage={(page) => this.handleSetPage(page)}
        />
        <Cart
          cart={this.state.cart}
          handleDeleteCartItem={(id) => this.handleDeleteCartItem(id)}
          handleCheckout={() => this.handleCheckout()}
        />
      </div>
    );
  }
}
