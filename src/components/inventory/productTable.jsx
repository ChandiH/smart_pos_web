import React, { Component } from "react";
import Table from "../common/table";

class ProductTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "category_name", label: "Category" },
    { path: "buying_ppu", label: "Buying Price" },
    { path: "retail_ppu", label: "Retail Price" },
    { path: "barcode", label: "Barcode" },
    { path: "supplier_id", label: "Supplier ID" },
  ];
  //     name: "Muffin Chocolate Individual Wrap",
  //     description: "Pork - Tenderloin, Frozen",
  //     category: "Comedy|Drama|Romance",
  //     image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
  //     weight: "1.5",
  //     units: "10",
  //     buyingPrice: "$48.67",
  //     retailPrice: "$8.85",
  //     barcode: "55154-5980",
  //     supplier_id: 98,

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products.map((product) => ({
          ...product,
          buying_ppu: "Rs. " + product.buying_ppu,
          retail_ppu: "Rs. " + product.retail_ppu,
        }))}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductTable;
