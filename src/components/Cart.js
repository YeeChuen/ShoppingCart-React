import React, { Component } from "react";

export default class Cart extends Component {
  render() {
    const { cart, handleDeleteCartItem, handleCheckout } = this.props;

    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="cart-wrapper">
          <ul className="cart__list-container">
            {cart.map((item) => {
              return (
                <div key={item.id} className="cart__item-container">
                  <span className="cart__item-name">
                    {item.content} x {item.number}
                  </span>
                  <button
                    className="cart__button-delete"
                    onClick={() => handleDeleteCartItem(item.id)}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </ul>
          <button className="checkout-btn" onClick={() => handleCheckout()}>
            checkout
          </button>
        </div>
      </div>
    );
  }
}
