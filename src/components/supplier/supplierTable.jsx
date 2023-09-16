import React, { Component } from "react";
import Table from "../common/table";

class SupplierTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "phone", label: "Contact" },
    { path: "email", label: "Email" },
    { path: "address", label: "Address" },
    {
      key: "select",
      content: (employee) => (
        <button
          onClick={() => this.props.onSelect(employee)}
          className="btn btn-danger btn-sm"
        >
          Select
        </button>
      ),
    },
  ];

  render() {
    const { suppliers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={suppliers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SupplierTable;
