import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/employee`;

export function getUserRoles() {
  return http.get(`${ApiEndPoint}/roles`);
}
