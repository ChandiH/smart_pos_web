import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { getBranches } from "../../services/fakeBranchService";
import { getEmployee, saveEmployee } from "../../services/fakeEmployeeService";
import { getUserRoles } from "../../services/fakeAuthorizationService";

class EmployeeForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      userRole: "",
      branch: "",
    },
    branches: [],
    userRoles: [],
    errors: {},
    accessLevel: "addEmployee",
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email").email(),
    phone: Joi.number().required().label("Phone Number"),
    branch: Joi.string().required().label("Branch"),
    userRole: Joi.string().required().label("User Role"),
  };

  componentDidMount() {
    try {
      this.setState({ branches: getBranches(), userRoles: getUserRoles() });
      console.log("state,", this.state);
    } catch (ex) {
      console.log("error,", ex);
    }

    const employeeId = this.props.match.params.id;
    if (employeeId === "new") return;

    const Employee = getEmployee(employeeId);
    if (!Employee) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(Employee) });
  }

  mapToViewModel(Employee) {
    return {
      name: Employee.name,
      email: Employee.email,
      phone: Employee.phone,
      role: Employee.role,
      userRole_id: Employee.userRole_id,
      userRole_name: Employee.userRole_name,
      branch: Employee.branch,
    };
  }

  mapToDataModel(Employee) {
    const userRole_obj = this.state.userRoles.find(
      (obj) => obj.name === this.state.data.userRole
    );
    const branch_obj = this.state.branches.find(
      (obj) => obj._id === this.state.data.branch
    );
    console.log("userRole_obj", userRole_obj);
    console.log("branch_obj", branch_obj);
    console.log("Employee", Employee);
    return {
      name: Employee.name,
      email: Employee.email,
      phone: Employee.phone,
      userRole_id: userRole_obj.userRole_id,
      branch: branch_obj.name,
    };
  }

  doSubmit = () => {
    saveEmployee(this.mapToDataModel(this.state.data));
    this.props.history.goBack();
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Employee</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("phone", "Contact")}
            {this.renderSelect("branch", "Branch", this.state.branches)}
            {this.renderSelect("userRole", "userRole", this.state.userRoles)}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default EmployeeForm;
