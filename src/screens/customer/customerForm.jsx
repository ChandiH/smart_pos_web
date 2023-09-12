import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { getCustomer, addCustomer } from "../../services/customerService";
class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    errors: {},
    accessLevel: "customerForm",
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    phone: Joi.number().label("Contact Number"),
    email: Joi.string().email().label("Email"),
    address: Joi.string().label("Address"),
  };

  componentDidMount() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;

    const customer = getCustomer(customerId);
    if (!customer) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(customer) });
  }

  mapToViewModel(customer) {
    return {
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
    };
  }

  doSubmit = () => {
    addCustomer(this.state.data);
    this.props.history.goBack();
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Customer</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("phone", "Contact Number")}
            {this.renderInput("email", "Email")}
            {this.renderInput("address", "Address")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default CustomerForm;
