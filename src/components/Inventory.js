import React, { Component } from "react";
import InventoryPages from "./InventoryPages";

export default class Inventory extends Component {
  render() {
    const {
      inventory,
      handleIncrement,
      handleDecrement,
      handleAddToCart,
      currentPage,
      itemsPerPage,
      totalPage,
      handleNextPage,
      handlePrevPage,
      handleSetPage,
    } = this.props;

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;

    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul className="inventory__list-container">
          {inventory.map((item, i) => {
            return start <= i && i < end ? (
              <div key={item.id} className="inventory__item-container">
                <span className="inventory__item-name">{item.content}</span>
                <button
                  className="inventory__button-subtract"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>
                <span className="inventory__item-number">{item.number}</span>
                <button
                  className="inventory__button-add"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
                <button
                  className="inventory__button-addcart"
                  onClick={() => handleAddToCart(item.id)}
                >
                  add to cart
                </button>
              </div>
            ) : null;
          })}
        </ul>
        <InventoryPages
          totalPage={totalPage}
          handleNextPage={() => handleNextPage()}
          handlePrevPage={() => handlePrevPage()}
          handleSetPage={(page) => handleSetPage(page)}
        />
      </div>
    );
  }
}
