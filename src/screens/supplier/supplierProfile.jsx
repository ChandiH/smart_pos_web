import React, { useEffect, useState } from "react";
import AccessFrame from "../../components/accessFrame";
import { getProductsBySupplier } from "../../services/productService";
import Table from "../../components/common/table";
import _ from "lodash";

const tableColumn = [
  {
    key: "image",
    content: (product) => (
      <img
        src={
          product.image ? product.image[0] : "https://placehold.co/200x200/png"
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
  { path: "barcode", label: "Barcode" },
];

const SupplierProfile = ({ history, location }) => {
  const [supplier, setSupplier] = useState({});
  const [products, setProducts] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  const fetchData = async () => {
    const { data: products } = await getProductsBySupplier(
      location.state.supplier_id
    );
    setProducts(products);
  };

  useEffect(() => {
    if (!location.state) return history.replace("/not-found");
    setSupplier(location.state);
    fetchData();
  }, [history, location.state]);

  const renderDetails = (label, name) => (
    <div className="row mb-2">
      <span className="col-4 text-muted">{label}:</span>
      <span className="col-8">{name}</span>
    </div>
  );

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sortedProducts = _.orderBy(
      products,
      [sortColumn.path],
      [sortColumn.order]
    );
    setProducts(sortedProducts);
  };

  return (
    <AccessFrame
      accessLevel={"supplierDetails"}
      onDenied={() => history.replace("/access-denied")}
    >
      <div className="container my-3">
        <h2>supplier Profile</h2>
      </div>
      <section className="py-1 container">
        <main className="col-lg-6 my-3">
          <h4 className="title text-dark">
            {supplier.name} <br />
          </h4>
          <div className="col my-3">
            {renderDetails("Email", supplier.email)}
            {renderDetails("Contact", supplier.phone)}
            {renderDetails("Address", supplier.address)}
          </div>
        </main>
        <h5 className="col-lg-6 my-3">Product List</h5>
        <hr />
        {products.length === 0 && (
          <p className="text-center">No products found.</p>
        )}
        <Table
          columns={tableColumn}
          data={products.map((product) => ({
            ...product,
            buying_ppu: "Rs. " + product.buying_ppu,
            retail_ppu: "Rs. " + product.retail_ppu,
          }))}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
      </section>
    </AccessFrame>
  );
};

export default SupplierProfile;