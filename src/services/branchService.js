import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/branch";

export function getAllBranches() {
  return http.get(ApiEndPoint);
}

export function getBranch(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}
