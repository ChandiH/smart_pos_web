import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/auth`;

// if user is authenticated, return user object
export function authenticate({ username, password }) {
  return http.post(`${ApiEndPoint}/login`, { username, password });
}

export function registerEmployee({
  employee_name,
  employee_userName,
  role_id,
  employee_email,
  employee_phone,
  branch_id,
  employee_image,
}) {
  return http.post(`${ApiEndPoint}/register`, {
    employee_name,
    employee_userName,
    employee_email,
    employee_phone,
    employee_image,
    branch_id,
    role_id,
  });
}

export function decodeJWT(token) {
  console.log(token);
}
