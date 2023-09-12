import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/customer";

export function getCustomers() {
  return http.get(ApiEndPoint);
}

export function getCustomer(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCustomer({ name, email, phone, address }) {
  return http.post(`${ApiEndPoint}`, { name, email, phone, address });
}
