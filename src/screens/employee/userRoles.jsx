import React from "react";
import SearchBox from "../../components/common/searchBox";
import UserRoleTable from "./../../components/employee/userRoleTable";
import { Component } from "react";
import { getUserRoles } from "../../services/fakeAuthorizationService";

const option = Object.freeze({
  CATEGORY: "category",
});

class UserRoles extends Component {
  state = {
    userRoles: [],
    filteredData: [],
    searchQuery: "",
    placeholder: "Search ... ",
    sortColumn: { path: "name", order: "asc" },
    selectedRole: {},
  };
  // const [searchQuery, setSearchQuery] = useState("");
  // const [placeHolder, setPlaceHolder] = useState("Search ...");
  // const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);

  componentDidMount() {
    const roles = getUserRoles();
    console.log(roles);
    this.setState({ userRoles: roles, filteredData: roles });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
    this.filterData(query);
  };

  filterData = (query) => {
    const allData = [...this.state.userRoles];
    let filtered = allData;
    if (query !== "")
      filtered = allData.filter((d) =>
        d.name.toLowerCase().startsWith(query.toLowerCase())
      );
    this.setState({ filteredData: filtered });
  };

  render() {
    const { searchQuery, placeholder, selectedRole } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-5">
            <div className="card p-3">
              <SearchBox
                value={searchQuery}
                placeholder={placeholder}
                onChange={this.handleSearch}
              />

              <UserRoleTable
                userRoles={this.state.filteredData}
                sortColumn={this.state.sortColumn}
                onSelect={(role) => this.setState({ selectedRole: role })}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="card p-3 mb-3">
              <h5 className="card-title mb-3">
                {selectedRole.name ? selectedRole.name : "Selecte UserRole"}
              </h5>
              <ul class="list-group list-group-flush">
                {selectedRole.access?.map((data, index) => (
                  <li key={index} class="list-group-item">
                    {data}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary mt-3">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRoles;
