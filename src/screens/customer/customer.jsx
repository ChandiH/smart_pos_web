import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import CustomerTable from "../../components/customer/customerTable";
import Pagination from "../../components/common/pagination";
import {
  getCustomers,
  deleteCustomer,
} from "../../services/fakeCustomerService";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import SearchBox from "../../components/common/searchBox";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    this.setState({ customers: getCustomers() });
  }

  handleDelete = (customer) => {
    const customers = this.state.customers.filter(
      (m) => m._id !== customer._id
    );
    this.setState({ customers });

    deleteCustomer(customer.id);
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
      customers: allCustomers,
    } = this.state;

    let filtered = allCustomers;
    console.log("all", allCustomers);
    if (searchQuery)
      filtered = allCustomers.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.id.toString() === searchQuery
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no Customers in the database.</p>;

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <div className="container my-3">
        <p>Showing {totalCount} Customers in the database.</p>
        <div className="row my-3">
          <div className="col-3">
            <NavLink className="btn btn-primary" to="/customers/new">
              Add new Customer
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
        <CustomerTable
          customers={customers}
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
    );
  }
}

export default Customers;
