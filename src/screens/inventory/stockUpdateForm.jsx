import React, { useState, useEffect, useContext } from "react";
import AccessFrame from "../../components/accessFrame";

import {
  getInventoryByProduct,
  updateInventory,
} from "../../services/inventoryService";
import UserContext from "../../context/UserContext";
import { getImageUrl } from "./../../services/imageHandler";

const StockUpdateForm = ({ history, match, location }) => {
  const accessLevel = "stockUpdateForm";
  const { currentUser } = useContext(UserContext);
  const [quantity, setQuantity] = useState(0);
  const [reorderLevel, setReorderLevel] = useState();
  const [response, setResponse] = useState([]);
  const [product, setProduct] = useState({});

  const fetchData = async () => {
    const { data: inventory } = await getInventoryByProduct(match.params.id);
    const stock = inventory.find(
      (stock) => stock.branch_id === currentUser.branch_id
    );
    const currentBranchStock = stock
      ? stock
      : {
          branch_id: currentUser.branch_id,
          branch_name: currentUser.branch_name,
          quantity: 0,
          reorder_level: 0,
        };
    setResponse(inventory);
    setProduct(
      inventory.length === 0
        ? {
            ...location.state,
            ...currentBranchStock,
          }
        : {
            ...inventory[0],
            ...currentBranchStock,
          }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setReorderLevel(product.reorder_level);
  }, [product]);
  // componentDidMount() {
  //   // this.setState({ product: { ...this.props.location.state } });
  //   // const product = products(this.props.match.params.id);
  //   // this.setState({
  //   //   product: {
  //   //     ...product,
  //   //     lastUpdated: product.stock.length
  //   //       ? product.stock[0].updatedAt
  //   //       : "out of stock",
  //   //     stock: product.stock.length
  //   //       ? product.stock
  //   //       : [
  //   //           {
  //   //             product_id: product.product_id,
  //   //             quantity: 0,
  //   //             updatedAt: "out of stock",
  //   //           },
  //   //         ],
  //   //   },
  //   // });
  //   this.fetchData();
  // }

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const updateBtnClick = async () => {
    try {
      const { data } = await updateInventory({
        branch_id: currentUser.branch_id,
        product_id: product.product_id,
        quantity: product.quantity + quantity,
        reorder_level: reorderLevel,
      });
      console.log("Inventory Updated Successfully", data);
      return history.replace("/inventory/update");
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
    }
    // if (quantity === 0)
    //   return this.props.history.push("/inventory/update");
    // const updatedInfo = updateInventory(
    //   this.state.product.stock[0],
    //   this.state.quantity
    // );
    // console.log(updatedInfo);
    // this.props.history.push("/inventory/update");
  };

  // getQuantity = () => {
  //   let quantity = 0;
  //   console.log(this.state.product);
  //   const { product } = this.state;
  //   if (product.stock.length === 0) return quantity;
  //   else {
  //     product.stock.forEach((stock) => {
  //       quantity += stock.quantity;
  //     });
  //     return quantity;
  //   }
  // };

  const renderDetails = (label, value) => (
    <>
      <dt className="col-5">{label}:</dt>
      <dd className="col-7">{value}</dd>
    </>
  );

  return (
    <AccessFrame accessLevel={accessLevel} onDenied={() => history.goBack()}>
      <div className="container my-3">
        <h2>Stock Update Form for {product.product_name}</h2>
      </div>
      <section className="container py-1">
        <div className="row gx-5">
          {product.product_image?.length > 0 && (
            <aside className="col-lg-6 my-5">
              <div className="rounded-4 mb-3 d-flex justify-content-center">
                <img
                  alt="display"
                  style={{ width: "60%", aspectRatio: 1, margin: "auto" }}
                  className="rounded-4 fit"
                  src={getImageUrl(product.product_image[0])}
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                {product.product_image.length > 1 &&
                  product.product_image
                    .slice(1)
                    .map((imgUri, index) => (
                      <img
                        key={index}
                        alt="sub"
                        width="70"
                        height="70"
                        className="rounded-2 border mx-2 item-thumb"
                        src={getImageUrl(imgUri)}
                      />
                    ))}
              </div>
            </aside>
          )}

          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
                {product.product_name} <br />
                <small className="text-muted">{product.category_name}</small>
              </h4>
              <div className="col my-3">
                <div className="col">
                  <span className="text-muted">{product.quantity} items</span>
                  <span className="text-success ms-2">In stock</span>
                </div>
                <div className="col">
                  <span className="text-muted">last updated at:</span>
                  <span className="text-success ms-2">
                    {product.updated_on?.slice(0, 10)}
                  </span>
                </div>
                <span className="text">{product.branch_name} Branch</span>
              </div>

              <p>
                Description: <br />
                {product.product_desc}
              </p>

              <div className="row">
                {renderDetails("Buying Price", `Rs. ${product.buying_price}`)}
                {renderDetails("Retail Price", `Rs. ${product.retail_price}`)}
                {renderDetails("Discount", `Rs. ${product.discount}`)}
                {renderDetails("Supplier", product.supplier_id)}
                {renderDetails("Reorder level", product.reorder_level)}
              </div>
              <hr />

              <div className="row">
                <div className="col">
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
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control text-center border "
                        value={quantity}
                        onChange={handleQuantityChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary shadow-0"
                    onClick={updateBtnClick}
                  >
                    Update Inventory
                  </button>
                </div>

                <div className="col">
                  <label className="mb-2 d-block">Reorder Alert Level:</label>
                  <div className="input mb-3" style={{ width: 150 }}>
                    <input
                      type="number"
                      className="form-control text-center border "
                      value={reorderLevel}
                      onChange={(e) => setReorderLevel(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary shadow-0"
                    onClick={updateBtnClick}
                  >
                    Change Level
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </AccessFrame>
  );
};

export default StockUpdateForm;
