import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { addBranch } from "../../services/branchService";

class BranchForm extends Form {
  state = {
    data: {
      branch_address: "",
      branch_city: "",
      branch_phone: "",
      branch_email: "",
    },
    errors: {},
    accessLevel: "addBranch",
  };

  schema = {
    branch_address: Joi.string().required().label("Address"),
    branch_city: Joi.string().required().label("City"),
    branch_email: Joi.string().required().label("Email").email(),
    branch_phone: Joi.number().required().label("Phone Number"),
  };

  doSubmit = async () => {
    try {
      console.log(this.state.data);
      await addBranch(this.state.data);
      return this.props.history.goBack();
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
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <h1>Add New Branch</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("branch_address", "Address")}
            {this.renderInput("branch_city", "City")}
            {this.renderInput("branch_email", "Email")}
            {this.renderInput("branch_phone", "Contact", "number")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default BranchForm;
