import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { getCustomer, addCustomer } from "../../services/customerService";
class CustomerForm extends Form {
  state = {
    data: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      customer_address: "",
    },
    errors: {},
    accessLevel: "customerForm",
  };

  schema = {
    customer_name: Joi.string().required().label("Name"),
    customer_phone: Joi.number().label("Contact Number"),
    customer_email: Joi.string().email().label("Email"),
    customer_address: Joi.string().label("Address"),
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
      customer_name: customer.customer_name,
      customer_phone: customer.customer_phone,
      customer_email: customer.customer_email,
      customer_address: customer.customer_address,
    };
  }

  doSubmit = async () => {
    try {
      const { data } = await addCustomer(this.state.data);
      console.log("Customer Added Successfully", data);
      return this.props.history.replace("/customers");
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
      this.setState({ errors: { ...e.response.data.error } });
    }
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
            {this.renderInput("customer_name", "Name")}
            {this.renderInput("customer_phone", "Contact Number")}
            {this.renderInput("customer_email", "Email")}
            {this.renderInput("customer_address", "Address")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default CustomerForm;
