import React, { useState } from "react";
import SearchBox from "../components/common/searchBox";
import AccessFrame from "../components/accessFrame";
import { getCategories } from "../services/categoryService";
import { getSuppliers } from "../services/supplierService";
import { getAllBranches } from "./../services/branchService";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const ConfigScreen = ({ history }) => {
  const { currentUser } = useContext(UserContext);
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
      name: c.category_name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const handleClickSupplierView = async () => {
    const { data: suppliers } = await getSuppliers();
    const formatted = suppliers.map((s) => ({
      _id: s.supplier_id,
      name: s.supplier_name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const handleClickBranchView = async () => {
    const { data: branches } = await getAllBranches();
    const formatted = branches.map((s) => ({
      _id: s.branch_id,
      name: s.branch_city,
      content: (branch) => (
        <button
          className="btn btn-danger mx-3"
          onClick={() => history.push(`/branch/${branch._id}`)}
        >
          select
        </button>
      ),
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
      onDenied={() => history.goBack()}
    >
      <div className="container my-3">
        <div className="row">
          <div className="col-5">
            {/* Branch Configuration */}
            <div className="card p-3 mb-3">
              <h5 className="card-title mb-3">Branch</h5>
              {optionButton("View Branch Details", () =>
                history.push(`/branch/${currentUser.branch_id}`)
              )}
              {optionButton(
                "Add new Branch",
                () => history.push("/branch"),
                handleClickBranchView
              )}
            </div>
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
            <div className="card p-3 mb-3">
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
                <ul className="list-group list-group-flush">
                  {filteredData.map((data, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {data.name}
                      {data.content ? data.content(data) : ""}
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
