import React, { useEffect, useState } from "react";
import SearchBox from "../../components/common/searchBox";
import UserRoleTable from "./../../components/employee/userRoleTable";
import _ from "lodash";

import {
  getAccessLevels,
  getUserRoles,
} from "../../services/fakeAuthorizationService";

const UserRoles = () => {
  const [accessLevels, setAccessLevels] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [selectedRole, setSelectedRole] = useState({});
  const [isSettingChanged, setIsSettingChanged] = useState(false);

  useEffect(() => {
    const accessLevels = getAccessLevels();
    const roles = getUserRoles();
    setAccessLevels(accessLevels);
    setUserRoles(roles);
    setFilteredData(roles);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sortedList = _.orderBy(
      userRoles,
      [sortColumn.path],
      [sortColumn.order]
    );
    setFilteredData(sortedList);
  };

  const filterData = (query) => {
    const allData = [...userRoles];
    let filtered = allData;
    if (query !== "")
      filtered = allData.filter((d) =>
        d.name.toLowerCase().startsWith(query.toLowerCase())
      );
    setFilteredData(filtered);
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-5">
          <div className="card p-3">
            <SearchBox
              value={searchQuery}
              placeholder="Search..."
              onChange={handleSearch}
            />
            <UserRoleTable
              userRoles={filteredData}
              sortColumn={sortColumn}
              onSort={handleSort}
              onSelect={(role) => setSelectedRole(role)}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="card p-3 mb-3">
            <h5 className="card-title mb-3">
              {selectedRole.name ? selectedRole.name : "Select UserRole"}
            </h5>
            <ul class="list-group list-group-flush">
              {accessLevels.map((access) => (
                <li class="form-check list-group-item">
                  <input
                    class="form-check-input mx-1"
                    type="checkbox"
                    value=""
                    onChange={() => setIsSettingChanged(true)}
                  />
                  <label class="form-check-label mx-3" for="flexCheckChecked">
                    {access}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary mt-3"
              disabled={!isSettingChanged}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
