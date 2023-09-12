import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../common/table";
import Like from "../common/like";

class CustomerTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "phone", label: "Contact" },
    { path: "email", label: "Email" },
    { path: "rewards_points", label: "Point Count" },
  ];
  //   columns = [
  //     {
  //       path: "title",
  //       label: "Title",
  //       content: (movie) => (
  //         <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  //       ),
  //     },
  //     { path: "genre.name", label: "Genre" },
  //     { path: "numberInStock", label: "Stock" },
  //     { path: "dailyRentalRate", label: "Rate" },
  //     {
  //       key: "like",
  //       content: (movie) => (
  //         <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
  //       ),
  //     },
  //     {
  //       key: "delete",
  //       content: (movie) => (
  //         <button
  //           onClick={() => this.props.onDelete(movie)}
  //           className="btn btn-danger btn-sm"
  //         >
  //           Delete
  //         </button>
  //       ),
  //     },
  //   ];

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomerTable;
