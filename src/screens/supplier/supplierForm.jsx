import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { addSupplier, getSupplier } from "../../services/supplierService";

class EmployeeForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    errors: {},
    accessLevel: "supplierForm",
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().label("Email").email(),
    phone: Joi.number().required().label("Phone Number"),
    address: Joi.string().required().label("Address"),
  };

  componentDidMount() {
    const supplierId = this.props.match.params.id;
    if (supplierId === "new") return;

    const Supplier = getSupplier(supplierId);
    if (!Supplier) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(Supplier) });
  }

  mapToViewModel(Supplier) {
    return {
      name: Supplier.name,
      email: Supplier.email,
      phone: Supplier.phone,
      address: Supplier.address,
    };
  }

  mapToDataModel(Supplier) {
    return {
      name: Supplier.name,
      email: Supplier.email,
      phone: Supplier.phone,
      address: Supplier.address,
    };
  }

  doSubmit = () => {
    addSupplier(this.state.data);
    // this.props.history.goBack();
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Supplier</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("email", "Email")}
            {this.renderInput("phone", "Contact", "number")}
            {this.renderInput("address", "Address")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default EmployeeForm;
