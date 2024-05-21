import React, { Component } from "react";
import { getCart } from "../../APIs/cartAPIs";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }

  async componentDidMount() {
    const data = await getCart();
    console.log("data", data);
    this.setState({ cart: data.reverse() });
  }

  render() {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul className="cart__list-container">
            {this.state.cart.map((item, i) => {
              return (
                <div key={item.id} className="cart__item-container">
                  <span className="cart__item-name">
                    {item.content} x {item.number}
                  </span>
                  <button className="cart__button-delete">delete</button>
                </div>
              );
            })}
          </ul>
          <button className="checkout-btn">checkout</button>
        </div>
      </div>
    );
  }
}
