import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination";
import SearchBox from "../../components/common/searchBox";
import StockTable from "../../components/inventory/stockTable";
import _ from "lodash";
import { getInventory } from "../../services/fakeInventoryService";

class UpdateInventory extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 20,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount() {
    const inventory = getInventory();
    const updatedInventory = inventory.map((item) => {
      return {
        ...item,
        lastUpdated: item.stock.length
          ? item.stock[0].updatedAt
          : "out of stock",
      };
    });
    this.setState({ products: [...updatedInventory] });
  }

  handleDelete = (product) => {
    const products = this.state.products.filter(
      (m) => m.product_id !== product.product_id
    );
    this.setState({ products });

    // deleteProduct(product.id);
  };

  handleSelect = (product) => {
    this.props.history.push(`/inventory/update/${product.product_id}`);
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
      products: allProducts,
    } = this.state;

    let filtered = allProducts;

    if (searchQuery)
      filtered = allProducts.filter(
        (m) =>
          m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.barcode.startsWith(searchQuery)
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Products };
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no Products in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <div className="container my-3">
        <p>Showing {totalCount} Products in the database.</p>
        <div className="row my-3">
          <div className="col-9">
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder={"Search... (name or barcode)"}
            />
          </div>
          <div className="col-3">
            <NavLink className="btn btn-primary" to="/inventory/new">
              Add new Product
            </NavLink>
          </div>
        </div>
        <StockTable
          products={products}
          sortColumn={sortColumn}
          onLike={this.handleLike}
          onSelect={this.handleSelect}
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

export default UpdateInventory;
