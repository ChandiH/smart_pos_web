import React, { Component } from "react";
import Table from "../common/table";

class ProductTable extends Component {
  columns = [
    {
      key: "image",
      content: (product) => (
        <img
          src={
            product.image
              ? product.image[0]
              : "https://placehold.co/200x200/png"
          }
          style={{ width: 40, aspectRatio: 1, marginLeft: 10, marginRight: 10 }}
          className="shadow-4 rounded"
          alt="image"
        />
      ),
    },
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
