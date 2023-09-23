import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/employee`;

export function getUserRoles() {
  return http.get(`${ApiEndPoint}/roles`);
}

export function changeUserAccess(role_id, access) {
  return http.post(`${ApiEndPoint}/roles`, { role_id, access });
}

export function accessList() {
  return http.get(`${ApiEndPoint}/access`);
}
