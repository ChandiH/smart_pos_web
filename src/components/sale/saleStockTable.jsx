import React, { Component } from "react";
import Table from "../common/table";

class SaleStockTable extends Component {
  //   state = {
  //     quantity: 1,
  //   };

  //   handleQuantityChange = (e) => {
  //     this.setState({ quantity: e.currentTarget.value });
  //   };
  //   handleIncrement = () => {
  //     this.setState({ quantity: this.state.quantity + 1 });
  //   };
  //   handleDecrement = () => {
  //     this.setState({ quantity: this.state.quantity - 1 });
  //   };

  columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "quantity", label: "Stock" },
    { path: "retail_ppu", label: "Retail Price" },
    // {
    //   key: "quantity",
    //   content: (product) => (
    //     <div className="input-group mb-3" style={{ width: 150 }}>
    //       <div
    //         className="btn-group"
    //         role="group"
    //         aria-label="Basic outlined example"
    //       >
    //         <button
    //           type="button"
    //           className="btn btn-outline-primary"
    //           onClick={this.handleDecrement}
    //         >
    //           -
    //         </button>
    //         <input
    //           type="text"
    //           className="form-control text-center border "
    //           value={this.state.quantity}
    //           onChange={this.handleQuantityChange}
    //         />
    //         <button
    //           type="button"
    //           className="btn btn-outline-primary"
    //           onClick={this.handleIncrement}
    //         >
    //           +
    //         </button>
    //       </div>
    //     </div>
    // <input type="number" min="1" className="form-control border" />
    //   ),
    // },
    {
      key: "select",
      content: (product) => (
        <button
          disabled={product.quantity == 0}
          onClick={() => this.props.onSelect(product)}
          className="btn btn-danger btn-sm"
        >
          Add to Cart
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

export default SaleStockTable;
