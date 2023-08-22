import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import { getBranches } from "../../services/fakeBranchService";
import { getEmployee, saveEmployee } from "../../services/fakeEmployeeService";

class EmployeeForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      role: "",
      branch: {},
    },
    branches: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email").email(),
    phone: Joi.number().required().label("Phone Number"),
    role: Joi.string().required().label("Role"),
  };

  componentDidMount() {
    const branches = getBranches();
    this.setState({ branches: branches });
    console.log(this.state);

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
      branch: "",
    };
  }

  doSubmit = () => {
    saveEmployee(this.state.data);

    this.props.history.push("/customers");
  };

  render() {
    return (
      <div className="container my-3">
        <h1>Add New Employee</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("phone", "Contact")}
          {this.renderSelect("branch", "Branch", this.state.branches)}
          <div className="my-3">{this.renderButton("Save")}</div>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;
