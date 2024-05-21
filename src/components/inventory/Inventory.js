import React, { Component } from "react";
import { getInventory } from "../../APIs/inventoryAPIs";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
    };
  }

  async componentDidMount() {
    const data = await getInventory();
    const newData = data.map((e) => {
        return {...e, number: 0}
    })
    console.log("data", newData);
    this.setState({ inventory: newData });
  }

  render() {
    return (
      <div className="inventory-container">
        <h1>Inventory</h1>
        <ul className="inventory__list-container">
          {this.state.inventory.map((item, index) => {
            return (
              <div key = {item.id} className="inventory__item-container">
                <span className="inventory__item-name">{item.content}</span>
                <button className="inventory__button-subtract">-</button>
                <span className="inventory__item-number">{item.number}</span>
                <button className="inventory__button-add">+</button>
                <button className="inventory__button-addcart">add to cart</button>
              </div>
            );
          })}
        </ul>
        <div className="pagination__container"></div>
      </div>
    );
  }
}
