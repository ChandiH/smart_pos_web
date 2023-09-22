import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/category`;

export function getCategories() {
  return http.get(ApiEndPoint);
}

export function getCategory(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCategory(name) {
  return http.post(`${ApiEndPoint}`, { name });
}
