import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/employee`;

export function getEmployees() {
  return http.get(ApiEndPoint);
}

export function getEmployee(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function updateEmployee(id, data) {
  return http.put(`${ApiEndPoint}/${id}`, data);
}
