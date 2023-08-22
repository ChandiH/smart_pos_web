import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import { getProduct, saveProduct } from "../../services/fakeProductService";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      category: "",
      buyingPrice: "",
      retailPrice: "",
      barcode: "",
      supplier_id: "",
    },
    errors: {},
  };

  /* sample data
   *  name: "Muffin Chocolate Individual Wrap",
   *  description: "Pork - Tenderloin, Frozen",
   *  category: "Comedy|Drama|Romance",
   *  image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
   *  buyingPrice: "$48.67",
   *  retailPrice: "$8.85",
   *  barcode: "55154-5980",
   *  supplier_id: 98,
   */

  schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    category: Joi.string().label("Category"),
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
  /*  name: "Muffin Chocolate Individual Wrap",
   *  description: "Pork - Tenderloin, Frozen",
   *  category: "Comedy|Drama|Romance",
   *  image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
   *  buyingPrice: "$48.67",
   *  retailPrice: "$8.85",
   *  barcode: "55154-5980",
   *  supplier_id: 98,
   */

  render() {
    return (
      <div className="container my-3">
        <h1>Add New Product</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("description", "Description")}
          {this.renderInput("category", "Category")}
          {this.renderInput("buyingPrice", "Buying Price")}
          {this.renderInput("retailPrice", "Retail Price")}
          {this.renderInput("barcode", "Barcode")}
          {this.renderInput("supplier_id", "Supplier ID", "number")}
          <div className="my-3">{this.renderButton("Save")}</div>{" "}
        </form>
      </div>
    );
  }
}

export default ProductForm;
