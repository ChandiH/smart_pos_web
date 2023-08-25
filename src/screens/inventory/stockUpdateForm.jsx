import React, { Component } from "react";
import AccessFrame from "../../components/accessFrame";

import { getInventoryByProduct } from "../../services/fakeInventoryService";

class StockUpdateForm extends Component {
  state = {
    product: {
      name: "",
      description: "",
      category: "",
      image: [],
      weight: "",
      unit: "",
      buyingPrice: "",
      retailPrice: "",
      barcode: "",
      supplier_id: "",
      stock: [],
    },
    quantity: 0,
    accessLevel: "stockUpdateForm",
  };

  componentDidMount() {
    const product = getInventoryByProduct(this.props.match.params.id);
    this.setState({ product });
  }

  handleIncrement = () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  handleDecrement = () => {
    this.setState({ quantity: this.state.quantity - 1 });
  };

  handleQuantityChange = (e) => {
    this.setState({ quantity: Number(e.target.value) });
  };

  updateBtnClick = () => {};

  getQuantity = () => {
    let quantity = 0;
    console.log(this.state.product);
    const { product } = this.state;
    if (product.stock.length === 0) return quantity;
    else {
      product.stock.forEach((stock) => {
        quantity += stock.quantity;
      });
      return quantity;
    }
  };

  render() {
    const { product, quantity } = this.state;
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.push("/access-denied")}
      >
        <div className="container my-3">
          <h2>Stock Update Form for {product.name}</h2>
        </div>
        <section className="py-1">
          <div className="container">
            <div className="row gx-5">
              {product.image.length > 0 && (
                <aside className="col-lg-6 my-5">
                  <div className="rounded-4 mb-3 d-flex justify-content-center">
                    <img
                      alt="display"
                      style={{ width: "60%", aspectRatio: 1, margin: "auto" }}
                      className="rounded-4 fit"
                      src={product.image[0]}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    {product.image.slice(1).map((imgUri) => (
                      <img
                        alt="sub"
                        width="70"
                        height="70"
                        className="rounded-2 border mx-2 item-thumb"
                        src={imgUri}
                      />
                    ))}
                  </div>
                </aside>
              )}

              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">
                    {product.name} <br />
                    <small className="text-muted">{product.category}</small>
                  </h4>
                  <div className="col my-3">
                    <div className="col">
                      <span className="text-muted">
                        {this.getQuantity()} items{" "}
                      </span>
                      <span className="text-success ms-2">In stock</span>
                    </div>

                    {product.stock.length > 0 && (
                      <div className="col">
                        <span className="text-muted">last updated:</span>
                        <span className="text-success ms-2">
                          {product.stock[0].updatedAt}
                        </span>
                      </div>
                    )}
                  </div>

                  <p>
                    Description: <br />
                    {product.description}
                  </p>

                  <div className="row">
                    <dt className="col-5 ">Weight:</dt>
                    <dd className="col-7">{product.weight}</dd>

                    <dt className="col-5 ">Units:</dt>
                    <dd className="col-7"> {product.unit}</dd>

                    <dt className="col-5">buying Price:</dt>
                    <dd className="col-7">{product.buyingPrice}</dd>

                    <dt className="col-5">retails price:</dt>
                    <dd className="col-7">{product.retailPrice}</dd>

                    <dt className="col-5">Supplier:</dt>
                    <dd className="col-7">{product.supplier_id}</dd>
                  </div>

                  <hr />

                  <div>
                    <label className="mb-2 d-block">New Stock</label>
                    <div className="input-group mb-3" style={{ width: 150 }}>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic outlined example"
                      >
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={this.handleDecrement}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center border "
                          value={quantity}
                          onChange={this.handleQuantityChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={this.handleIncrement}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary shadow-0"
                    onClick={this.updateBtnClick}
                  >
                    Update Inventory
                  </button>
                </div>
              </main>
            </div>
          </div>
        </section>
      </AccessFrame>
    );
  }
}

export default StockUpdateForm;
