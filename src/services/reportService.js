import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/chart`;

export function getMonthlySale(yearMonth, branchId) {
  return http.get(`${ApiEndPoint}/${yearMonth}/${branchId}`);
}


export function getSalesHistoryToday(branch_id) {
  return http.get(`${ApiEndPoint}/sale_history/${branch_id}`);
}

export function getMonthlySummary() {
  return http.get(`${ApiEndPoint}/monthly_summary`);
}