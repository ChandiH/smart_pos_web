import http from "./httpService";

const access = [
  {
    access_type_id: 1,
    access_name: "configuration",
  },
  {
    access_type_id: 2,
    access_name: "report",
  },
  {
    access_type_id: 3,
    access_name: "employee",
  },
  {
    access_type_id: 4,
    access_name: "employeeDetails",
  },
  {
    access_type_id: 5,
    access_name: "addEmployee",
  },
  {
    access_type_id: 6,
    access_name: "inventory",
  },
  {
    access_type_id: 7,
    access_name: "productForm",
  },
  {
    access_type_id: 8,
    access_name: "stockUpdateForm",
  },
  {
    access_type_id: 9,
    access_name: "productCatalog",
  },
  {
    access_type_id: 10,
    access_name: "customerForm",
  },
  {
    access_type_id: 11,
    access_name: "customers",
  },
  {
    access_type_id: 12,
    access_name: "supplierForm",
  },
  {
    access_type_id: 13,
    access_name: "supplier",
  },
  {
    access_type_id: 14,
    access_name: "supplierDetails",
  },
  {
    access_type_id: 15,
    access_name: "addBranch",
  },
];

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/employee`;

export function getUserRoles() {
  return http.get(`${ApiEndPoint}/roles`);
}

export function changeUserAccess(role_id, access) {
  return http.post(`${ApiEndPoint}/roles`, { role_id, access });
}

export function accessList() {
  return access;
}

export function checkAccess(role_id, access_name) {
  return http.post(`${ApiEndPoint}/check-access`, {
    role_id: role_id,
    access_name: access_name,
  });
}