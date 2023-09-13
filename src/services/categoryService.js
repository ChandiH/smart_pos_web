import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/inventory/category";

export function getCategories() {
  return http.get(ApiEndPoint);
}

export function getCategory(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCategory(name) {
  return http.post(`${ApiEndPoint}`, { name });
}
