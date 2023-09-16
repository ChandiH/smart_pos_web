import React, { Component } from "react";
import Table from "../common/table";

class StockTable extends Component {
  handleText(product) {
    return parseInt(product.reorder_level) > parseInt(product.quantity) ||
      parseInt(product.quantity) === 0 ? (
      <p style={{ color: "red" }}>{product.quantity}</p>
    ) : (
      <p>{product.quantity}</p>
    );
  }

  columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "category_name", label: "Category" },
    { path: "buying_ppu", label: "Buying Price" },
    { path: "retail_ppu", label: "Retail Price" },
    {
      key: "lowStock",
      label: "Stock",
      content: (product) => this.handleText(product),
    },
    { path: "lastupdate_at", label: "Last Updated" },
    {
      key: "select",
      content: (product) => (
        <button
          onClick={() => this.props.onSelect(product)}
          className="btn btn-danger btn-sm"
        >
          Select
        </button>
      ),
    },
  ];
  //     name: "Muffin Chocolate Individual Wrap",
  //     description: "Pork - Tenderloin, Frozen",
  //     category: "Comedy|Drama|Romance",
  //     image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
  //     buyingPrice: "$48.67",
  //     retailPrice: "$8.85",
  //     barcode: "55154-5980",
  //     supplier_id: 98,

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default StockTable;
