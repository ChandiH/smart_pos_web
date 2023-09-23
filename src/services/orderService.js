import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/cart`;

export function submitOrder(data) {
  return http.post(`${ApiEndPoint}/insert`, data);
}
