import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { getProduct, saveProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import UploadImage from "../../components/common/uploadImage";

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
      category: "",
      buying_ppu: "",
      retail_ppu: "",
      discount: "",
      barcode: "",
      supplier_id: "",
    },
    images: [],
    categories: [],
    errors: {},
    accessLevel: "productForm",
  };

  schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().label("Description"),
    category: Joi.string().label("Category"),
    buying_ppu: Joi.string().label("Buying Price"),
    retail_ppu: Joi.string().label("Retail Price"),
    discount: Joi.string().label("Discount"),
    barcode: Joi.string().label("Barcode"),
    supplier_id: Joi.number().label("Supplier ID"),
  };

  async fetchData() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  componentDidMount() {
    this.fetchData();
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
      buying_ppu: product.buyingPrice,
      retail_ppu: product.retail_ppu,
      discount: product.discount,
      barcode: product.barcode,
      supplier_id: product.supplier_id,
    };
  }

  doSubmit = () => {
    saveProduct(this.state.data, this.state.images);
    // this.props.history.push("/inventory");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.replace("/access-denied")}
      >
        <div className="container my-3">
          <h1>Add New Product</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("description", "Description")}
            {this.renderSelectWithBtn(
              "category",
              "Category",
              "Select Category",
              this.state.categories,
              () => this.props.history.push("/inventory/categories/new"),
              "Add New Category"
            )}
            {this.renderInput("buying_ppu", "Buying Price", "number")}
            {this.renderInput("retail_ppu", "Retail Price", "number")}
            {this.renderInput("discount", "Discount", "number")}
            <UploadImage
              fileTypes={["JPG", "PNG", "GIF"]}
              setFiles={(files) => this.setState({ images: files })}
            />
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
