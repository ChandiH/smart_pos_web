import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/inventory";

// will return each product with its stock quantity in each branch
export function getInventory() {
  return http.get(ApiEndPoint);
}

export function getInventoryByProduct(id) {
  return http.get(`${ApiEndPoint}/product/${id}`);
}

export function getInventoryByBranch(id) {
  return http.get(`${ApiEndPoint}/branch/${id}`);
}
