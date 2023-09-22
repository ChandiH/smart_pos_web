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
      product_name: "",
      product_desc: "",
      category_id: "",
      buying_price: "",
      retail_price: "",
      discount: "",
      product_barcode: "",
      supplier_id: "",
    },
    images: [],
    categories: [],
    errors: {},
    accessLevel: "productForm",
  };

  schema = {
    product_name: Joi.string().required().label("Name"),
    product_desc: Joi.string().label("Description"),
    category_id: Joi.string().label("Category"),
    buying_price: Joi.string().label("Buying Price"),
    retail_price: Joi.string().label("Retail Price"),
    discount: Joi.string().label("Discount"),
    product_barcode: Joi.string().label("Barcode"),
    supplier_id: Joi.number().label("Supplier ID"),
  };

  async fetchData() {
    try {
      const { data: categories } = await getCategories();
      const formatted = categories.map((category) => ({
        _id: category.category_id,
        name: category.category_name,
      }));
      this.setState({ categories: formatted });
    } catch (e) {
      console.log("Error in fetching Categories");
      alert(e.response.data);
    }
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
      product_name: product.product_name,
      product_desc: product.product_desc,
      category_id: product.category_id,
      buying_price: product.buying_price,
      retail_price: product.retail_price,
      discount: product.discount,
      product_barcode: product.product_barcode,
      supplier_id: product.supplier_id,
    };
  }

  doSubmit = async () => {
    console.log("Submitted", { ...this.state.data, files: this.state.images });

    try {
      const { data } = await saveProduct(this.state.data, this.state.images);
      console.log("Product Added Successfully", data);
      return this.props.history.replace("/inventory/catalog");
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
      this.setState({ errors: { ...e.response.data.error } });
    }
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
            {this.renderInput("product_name", "Name")}
            {this.renderInput("product_desc", "Description")}
            {this.renderSelectWithBtn(
              "category_id",
              "Category",
              "Select Category",
              this.state.categories,
              () => this.props.history.push("/inventory/categories/new"),
              "Add New Category"
            )}
            {this.renderInput("buying_price", "Buying Price", "number")}
            {this.renderInput("retail_price", "Retail Price", "number")}
            {this.renderInput("discount", "Discount", "number")}
            <UploadImage
              fileTypes={["JPG", "PNG", "GIF"]}
              setFiles={(files) => this.setState({ images: [...files] })}
            />
            {this.renderInput("product_barcode", "Barcode")}
            {this.renderInput("supplier_id", "Supplier ID", "number")}
            <div className="my-3">{this.renderButton("Save")}</div>{" "}
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default ProductForm;
