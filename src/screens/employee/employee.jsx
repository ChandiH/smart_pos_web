import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/common/pagination";
import { paginate } from "../../utils/paginate";
import SearchBox from "../../components/common/searchBox";
import EmployeeTable from "./../../components/employee/employeeTable";
import AccessFrame from "../../components/accessFrame";
import _ from "lodash";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/fakeEmployeeService";
import { getBranch } from "../../services/fakeBranchService";

class Employee extends Component {
  state = {
    employees: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    accessLevel: "employee",
  };

  componentDidMount() {
    const employees = getEmployees();
    const updatedEmployees = employees.map((employee) => {
      const branch = getBranch(employee.branch_id);
      return { ...employee, branch: branch.name };
    });
    this.setState({ employees: updatedEmployees });
  }

  handleDelete = (employee) => {
    const employees = this.state.employees.filter(
      (m) => m._id !== employee._id
    );
    this.setState({ employees });

    deleteEmployee(employee.id);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      employees: allEmployees,
    } = this.state;

    let filtered = allEmployees;
    if (searchQuery)
      filtered = allEmployees.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.id.toString() === searchQuery
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const employees = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: employees };
  };

  render() {
    const { length: count } = this.state.employees;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no Employees in the database.</p>;

    const { totalCount, data: employees } = this.getPagedData();

    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <p>Showing {totalCount} Employees in the database.</p>
          <div className="row my-3">
            <div className="col-3">
              <NavLink className="btn btn-primary" to="/employee/new">
                Add new Employee
              </NavLink>
            </div>
            <div className="col-9">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder={"Search... (name or id)"}
              />
            </div>
          </div>
          <EmployeeTable
            employees={employees}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </AccessFrame>
    );
  }
}

export default Employee;
