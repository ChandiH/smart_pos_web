import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/employee";

export function getEmployees() {
  return http.get(ApiEndPoint);
}

export function getEmployee(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addEmployee({
  name,
  username,
  email,
  phone,
  role_id,
  branch_id,
}) {
  return http.post(`${ApiEndPoint}`, {
    name,
    username,
    email,
    phone,
    role_id,
    branch_id,
  });
}
