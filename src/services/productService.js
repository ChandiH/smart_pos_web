import http from "./httpService";

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
