import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";
import SearchBox from "../../components/common/searchBox";
import SaleStockTable from "../../components/sale/saleStockTable";
import SaleCartTable from "../../components/sale/saleCartTable";
import _ from "lodash";

import { getInventoryByBranch } from "../../services/fakeInventoryService";
import { getCustomers } from "../../services/fakeCustomerService";
import { saveOrder } from "../../services/fakeOrderService";
import SummaryWindow from "../../components/sale/summaryWindow";

const CashierSalePage = ({ history }) => {
  const accessLevel = "cashierSalePage";
  const [sortColumn, setSortColumn] = useState({
    path: "name",
    order: "asc",
  });
  const cartSortColumn = {
    path: "name",
    order: "desc",
  };
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    name: "Guest Customer",
    contact: "guest",
    pointCount: "not valid",
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [productSearchQuery, setPoductSearchQuery] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const products = getInventoryByBranch(currentUser.branch_id);
    setProducts(products);
    setCustomers(getCustomers());
  }, [currentUser.branch_id]);

  const handleSort = (sortColumn) => {
    setSortColumn({ sortColumn });
  };

  const handleProductSearch = (query) => {
    setPoductSearchQuery(query);
  };

  const handleCustomerSearch = (query) => {
    setCustomerSearchQuery(query);
    const guestCustomer = {
      name: "Guest Customer",
      contact: "0000000000",
      pointCount: 0,
    };
    if (query === "") {
      setCustomer(guestCustomer);
      return;
    }
    let filterCustomer = null;
    if (query) {
      filterCustomer = customers.filter(
        (m) =>
          m.name.toLowerCase().startsWith(query.toLowerCase()) ||
          m.contact.toString() === query
      );
    }
    if (filterCustomer && filterCustomer.length > 0) {
      setCustomer(filterCustomer[0]);
    } else {
      setCustomer(guestCustomer);
    }
  };

  const onAddToCart = (product) => {
    setPoductSearchQuery("");
    const cartCopy = [...cart];
    //check if product already in the cart
    const oldProduct = cartCopy.find(
      (prod) => product.product_id === prod.product_id
    );
    let updatedProduct = { ...product };
    if (oldProduct) {
      const index = cartCopy.indexOf(oldProduct);
      updatedProduct = {
        ...updatedProduct,
        quantity: oldProduct.quantity + 1,
      };
      cartCopy[index] = updatedProduct;
    } else {
      updatedProduct = { ...updatedProduct, quantity: 1 };
      cartCopy.push(updatedProduct);
    }
    setCart(cartCopy);
    console.log("add to cart", updatedProduct);
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    cart.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    if (cart.length !== 0) {
      cart.forEach((product) => {
        totalPrice += parseFloat(
          (product.quantity * product.retailPrice.slice(4)).toFixed(2)
        );
      });
    }
    return totalPrice;
  };

  const getDiscount = () => {
    let discount = 0;
    cart.forEach((product) => {
      discount += parseFloat(product.quantity * product.discount.toFixed(2));
    });
    return discount;
  };

  const getPagedData = () => {
    const allProducts = products;

    let filtered = productSearchQuery
      ? allProducts.filter(
          (m) =>
            m.name.toLowerCase().startsWith(productSearchQuery.toLowerCase()) ||
            m.barcode.startsWith(productSearchQuery)
        )
      : [];

    const sorted = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    ).slice(0, 3);

    return { data: sorted };
  };

  const validateOrder = () => {
    return cart.length > 0 && paymentDetails;
  };

  const placeOrder = () => {
    console.log("order placed");
    saveOrder(currentUser, customer, cart);
    setCart([]);
    handleCustomerSearch("");
    setPaymentMethod("cash");
    setPaymentDetails("");
  };

  const paymentHandler = (paymentType) => {
    if (paymentDetails === paymentType) return;
    setPaymentMethod(paymentType);
    setPaymentDetails("");
  };

  const getButtonProperties = (name) => {
    if (name === paymentMethod) {
      return "col btn border rounded-2 mx-2 btn-primary";
    }
    return "col btn btn-secondry border rounded-2 mx-2";
  };

  return (
    <div className="container-fluid row mt-3">
      <div className="col-9">
        {/* prodcut search */}
        <div className="row">
          <div className="col-2">
            <h5>Add Items</h5>
          </div>
          <div className="col">
            <SearchBox
              value={productSearchQuery}
              onChange={handleProductSearch}
              placeholder={"Search... (name or barcode)"}
            />
          </div>
          <SaleStockTable
            products={getPagedData().data}
            onSort={handleSort}
            sortColumn={sortColumn}
            onSelect={onAddToCart}
          />
        </div>

        {/* cart */}
        <div className="row">
          <div className="col-2">
            <h5>Cart</h5>
          </div>
          <div className="col" />
          <div className="col-2 btn btn-danger" onClick={() => setCart([])}>
            Clear Cart
          </div>
          <SaleCartTable onSort={handleSort} sortColumn={cartSortColumn} />
        </div>
      </div>

      {/* cusotmer info section */}
      <div className="col-3">
        <div className="row my-2">
          <h5 className="col">Customer Info</h5>
          <div
            className="col btn btn-primary"
            onClick={() => history.push("/customers/new")}
          >
            Add New Customer
          </div>
        </div>
        <SearchBox
          value={customerSearchQuery}
          onChange={handleCustomerSearch}
          placeholder={"Search... (name, contact or email)"}
        />
        <div className="row mt-2">
          <dt className="col-5 ">Customer Name:</dt>
          <dd className="col-7 align-right">{customer?.name}</dd>
          {customer.name !== "Guest Customer" && (
            <>
              <dt className="col-5 ">Contact:</dt>
              <dd className="col-7 align-right">{customer?.contact}</dd>
              <dt className="col-7">Total Loyalty Points:</dt>
              <dd className="col-5 align-right">{customer?.pointCount}</dd>
            </>
          )}
        </div>
        <hr />

        {/* bill summary */}
        <div className="row">
          <h5>Bill Summary</h5>
          <div className="col mt-2">
            <div className="row">
              <dt className="col-5 ">Cashier Name:</dt>
              <dd className="col-7 align-right">{currentUser.name}</dd>

              <dt className="col-5 ">Total Quantity:</dt>
              <dd className="col-7 align-right">{getTotalQuantity()}</dd>

              <dt className="col-7">Sub Total:</dt>
              <dd className="col-5 align-right">{getTotalPrice()}</dd>

              <dt className="col-7">Discount:</dt>
              <dd className="col-5 align-right">-{getDiscount()}</dd>
            </div>
          </div>
          <hr />
          <div className="col">
            <div className="row">
              <dt className="col-7">
                <h5>
                  <b>Grand Total:</b>
                </h5>
              </dt>
              <dd className="col-5 align-right">
                <h5>
                  <b>
                    Rs.{parseFloat(getTotalPrice() - getDiscount()).toFixed(2)}
                  </b>
                </h5>
              </dd>
            </div>
          </div>
          <hr />
        </div>
        {/* payment method */}
        <div className="row">
          <h5>Payment Method</h5>
          <div className="col mt-2">
            <div className="row mb-2">
              <button
                className={getButtonProperties("cash")}
                onClick={() => paymentHandler("cash")}
              >
                Cash
              </button>
              <button
                className={getButtonProperties("credit/debit")}
                onClick={() => paymentHandler("credit/debit")}
              >
                Credit/Debit
              </button>
            </div>
            <div className="row mb-2">
              <button
                disabled
                className={getButtonProperties("mobile")}
                onClick={() => paymentHandler("mobile")}
              >
                Mobile Payment
              </button>
              <button
                className={getButtonProperties("loyalty")}
                disabled={customer.name === "Guest Customer"}
                onClick={() => paymentHandler("loyalty")}
              >
                Loyalty
              </button>
            </div>
            {paymentMethod === "cash" ? (
              <>
                <dt>Cash Given: </dt>
                <input
                  type="number"
                  name="cash given"
                  className="form-control mt-2"
                  placeholder="amount given"
                  value={paymentDetails}
                  onChange={(data) =>
                    setPaymentDetails(data.currentTarget.value)
                  }
                />
              </>
            ) : (
              <>
                <dt>Reference Number: </dt>
                <input
                  type="text"
                  name="query"
                  className="form-control mt-2"
                  placeholder="type here"
                  value={paymentDetails}
                  onChange={(data) =>
                    setPaymentDetails(data.currentTarget.value)
                  }
                />
              </>
            )}
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-7">
            <input
              type="text"
              name="query"
              className="form-control col"
              placeholder="comment"
              style={{ aspectRatio: 3 }}
            />
          </div>
          <button
            disabled={!validateOrder()}
            className="btn btn-primary col-5 pt-3"
            data-toggle="modal"
            data-target="#popUpWindow"
          >
            <h3>Bill</h3>
          </button>
          <SummaryWindow
            id={"popUpWindow"}
            cashierName={currentUser.name}
            customerName={customer.name}
            quantity={getTotalQuantity()}
            discount={getDiscount()}
            totalPrice={getTotalPrice()}
            paymentMethod={paymentMethod}
            paymentDetails={paymentDetails}
            placeOrder={placeOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CashierSalePage;
