import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { getProduct, saveProduct } from "../../services/fakeProductService";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      category: "",
      weight: "",
      units: "",
      buyingPrice: "",
      retailPrice: "",
      barcode: "",
      supplier_id: "",
    },
    errors: {},
    accessLevel: "productForm",
  };

  schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    category: Joi.string().label("Category"),
    weight: Joi.number().label("Weight"),
    units: Joi.number().label("Units"),
    buyingPrice: Joi.string().label("Buying Price"),
    retailPrice: Joi.string().label("Retail Price"),
    barcode: Joi.string().label("Barcode"),
    supplier_id: Joi.number().label("Supplier ID"),
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    if (productId === "new") return;

    const product = getProduct(productId);
    if (!product) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(product) });
  }

  mapToViewModel(product) {
    return {
      name: product.name,
      description: product.description,
      category: product.category,
      weight: product.weight,
      units: product.units,
      buyingPrice: product.buyingPrice,
      retailPrice: product.retailPrice,
      barcode: product.barcode,
      supplier_id: product.supplier_id,
    };
  }

  doSubmit = () => {
    saveProduct(this.state.data);

    this.props.history.push("/inventory");
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.push("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Product</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("description", "Description")}
            {this.renderInput("category", "Category")}
            {this.renderInput("buyingPrice", "Buying Price")}
            {this.renderInput("retailPrice", "Retail Price")}
            {this.renderInput("weight", "Weight")}
            {this.renderInput("units", "Units")}
            {this.renderInput("barcode", "Barcode")}
            {this.renderInput("supplier_id", "Supplier ID", "number")}
            <div className="my-3">{this.renderButton("Save")}</div>{" "}
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default ProductForm;
