import React, { useState } from "react";
import SearchBox from "../components/common/searchBox";
import AccessFrame from "../components/accessFrame";
import { getCategories } from "../services/categoryService";
import { getSuppliers } from "../services/supplierService";

const ConfigScreen = ({ history }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeHolder] = useState("Search ...");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const handleClickCategoryView = async () => {
    const { data: categories } = await getCategories();
    const formatted = categories.map((c) => ({
      _id: c.category_id,
      name: c.name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const handleClickSupplierView = async () => {
    const { data: suppliers } = await getSuppliers();
    const formatted = suppliers.map((s) => ({
      _id: s.supplier_id,
      name: s.name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const filterData = (query) => {
    const allData = [...data];
    let filtered = allData;
    if (query !== "")
      filtered = allData.filter((d) =>
        d.name.toLowerCase().startsWith(query.toLowerCase())
      );

    setFilteredData(filtered);
  };

  const optionButton = (name, onBtnClick, onViewClick) => {
    return (
      <div className="row mb-3 mx-3">
        <button className="col btn btn-primary shadow-0" onClick={onBtnClick}>
          {name}
        </button>
        {onViewClick && (
          <button
            className="col-2 btn btn-secondary mx-3 "
            onClick={onViewClick}
          >
            {" >"}
          </button>
        )}
      </div>
    );
  };

  return (
    <AccessFrame
      accessLevel={"configuration"}
      onDenied={() => history.replace("/access-denied")}
    >
      <div className="container my-3">
        <div className="row">
          <div className="col-5">
            {/* Inventory Configuration */}
            <div className="card p-3 mb-3">
              <h5 className="card-title mb-3">Inventory</h5>
              {optionButton(
                "Add new Category",
                () => history.push("/inventory/categories/new"),
                handleClickCategoryView
              )}
            </div>
            {/* Suppliers*/}
            <div className="card p-3 mb-3">
              <h5 className="card-title mb-3">Suppliers</h5>
              {optionButton("View Suppliers", () => history.push("/suppliers"))}
              {optionButton(
                "Add new Supplier",
                () => history.push("/suppliers/new"),
                handleClickSupplierView
              )}
            </div>
            {/* Access Setting */}
            <div className="card p-3">
              <h5 className="card-title mb-3">Access Rights</h5>
              {optionButton("Edit User Roles", () =>
                history.push("/employee/roles")
              )}
            </div>
          </div>

          <div className="col-6">
            <div className="card p-3">
              <SearchBox
                value={searchQuery}
                placeholder={placeHolder}
                onChange={handleSearch}
              />
              <div className="card p-3 mt-3">
                <ul class="list-group list-group-flush">
                  {filteredData.map((data, index) => (
                    <li key={index} class="list-group-item">
                      {data.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccessFrame>
  );
};

export default ConfigScreen;
