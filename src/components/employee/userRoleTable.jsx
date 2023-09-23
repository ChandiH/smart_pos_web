import React, { Component } from "react";
import Table from "../common/table";

class UserRoleTable extends Component {
  columns = [
    {
      path: "role_name",
      label: "Name",
    },
    {
      key: "select",
      content: (role) => (
        <button
          onClick={() => this.props.onSelect(role)}
          className="btn btn-danger btn-sm"
        >
          Select
        </button>
      ),
    },
  ];

  render() {
    const { userRoles, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={userRoles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UserRoleTable;
