import http from "./httpService";
// import uploader from "./uploaderService";

const ApiEndPoint = "http://localhost:4000/product";

export function getProducts() {
  return http.get(ApiEndPoint);
}

export function getProduct(id) {
  return http.get(ApiEndPoint + "/" + id);
}

export function getProductWithCategory() {
  return http.get(ApiEndPoint + "/withcategory");
}

export function getProductsBySupplier(supplier_id) {
  return http.get(ApiEndPoint + "/supplier/" + supplier_id);
}

export function saveProduct(data, images) {
  // use uploader service to upload images
  console.log(data);
  console.log(images);
}
