import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import {
  addNewCategory,
  getCategories,
  getCategory,
} from "./../../services/fakeCategoryService";

class Categories extends Form {
  state = {
    data: {
      name: "",
    },
    errors: {},
    accessLevel: "productForm",
  };

  schema = {
    name: Joi.string().required().label("Name"),
  };

  componentDidMount() {
    const category_id = this.props?.match.params.id;
    if (category_id === "new") return;

    const category = getCategory(category_id);
    if (!category) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(category) });
  }

  mapToViewModel(category) {
    return {
      name: category.name,
    };
  }

  doSubmit = async () => {
    await addNewCategory(this.state.data.name);
    console.log(getCategories());
    this.props.history.goBack();
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Category</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            <div className="my-3">{this.renderButton("Save")}</div>{" "}
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default Categories;
