import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/chart`;

export function getMonthlySale(yearMonth, branchId) {
  return http.get(`${ApiEndPoint}/${yearMonth}/${branchId}`);
}
