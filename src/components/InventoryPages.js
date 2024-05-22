import React, { Component } from "react";

export default class InventoryPages extends Component {
  render() {
    const { totalPage, handleNextPage, handlePrevPage, handleSetPage } =
      this.props;

    const pages = [];
    for (let i = 0; i < totalPage; i++) {
      pages.push(
        <button key={i} onClick={() => handleSetPage(i)}>
          {i + 1}
        </button>
      ); // <-- not the best to use index as key.
    }

    return (
      <div className="pagination__container">
        <button onClick={() => handlePrevPage()}>Prev</button>
        {pages}
        <button onClick={() => handleNextPage()}>Next</button>
      </div>
    );
  }
}
