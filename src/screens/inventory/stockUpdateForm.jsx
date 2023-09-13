import React, { useState, useEffect, useContext } from "react";
import AccessFrame from "../../components/accessFrame";

import { getInventoryByProduct } from "../../services/inventoryService";
import UserContext from "../../context/UserContext";

const StockUpdateForm = ({ history, match }) => {
  const accessLevel = "stockUpdateForm";
  const { currentUser } = useContext(UserContext);
  const [quantity, setQuantity] = useState(0);
  const [response, setResponse] = useState([]);
  const [product, setProduct] = useState({});

  // state = {
  //   product: {
  //     product_id: "",
  //     name: "",
  //     description: "",
  //     category: "",
  //     image: [],
  //     weight: "",
  //     unit: "",
  //     buyingPrice: "",
  //     retailPrice: "",
  //     barcode: "",
  //     supplier_id: "",
  //     stock: [],
  //     lastUpdated: "",
  //   },
  // };

  const fetchData = async () => {
    const { data: product } = await getInventoryByProduct(match.params.id);
    console.log(product);
    setResponse(product);
    setProduct({
      ...product[0],
      image: [
        "https://placehold.co/600x400/png",
        "https://placehold.co/200x200/png",
        "https://placehold.co/200x200/png",
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
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
    setQuantity({ quantity: quantity + 1 });
  };

  const handleDecrement = () => {
    setQuantity({ quantity: quantity - 1 });
  };

  const handleQuantityChange = (e) => {
    setQuantity({ quantity: Number(e.target.value) });
  };

  const updateBtnClick = () => {
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

  return (
    <AccessFrame
      accessLevel={accessLevel}
      onDenied={() => history.replace("/access-denied")}
    >
      <div className="container my-3">
        <h2>Stock Update Form for {product.name}</h2>
      </div>
      <section className="py-1">
        <div className="container">
          <div className="row gx-5">
            {product.image?.length > 0 && (
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
                  {product.image.slice(1).map((imgUri, index) => (
                    <img
                      key={index}
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
                      {product.lastupdate_at?.slice(0, 10)}
                    </span>
                  </div>
                  <span className="text">{product.branch_name} Branch</span>
                </div>

                <p>
                  Description: <br />
                  {product.description}
                </p>

                <div className="row">
                  <dt className="col-5">buying Price:</dt>
                  <dd className="col-7">Rs. {product.buying_ppu}</dd>

                  <dt className="col-5">retails price:</dt>
                  <dd className="col-7">Rs. {product.retail_ppu}</dd>

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
                        onClick={handleDecrement}
                      >
                        -
                      </button>
                      <input
                        type="text"
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
                </div>
                <button
                  className="btn btn-primary shadow-0"
                  onClick={updateBtnClick}
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
};

export default StockUpdateForm;
