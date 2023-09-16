import React, { useEffect } from "react";
import MonthlySaleChart from "../components/charts/monthlySaleChart";
import MonthlyBranchChart from "../components/charts/monthlyBranchChart";
import MonthlyProductChart from "./../components/charts/monthlyProductChart";
import { useContext } from "react";
import UserContext from "./../context/UserContext";
import SaleHistoryView from "../components/sale/saleHistortView";
import DashBoardTile from "../components/charts/dashboardTile";

const Dashboard = ({ history }) => {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    switch (currentUser.userRole_id) {
      case 103:
        return history.replace("/sale");
      default:
        return;
    }
  }, [currentUser, history]);
  return (
    <div className="container">
      <div className="row">
        <DashBoardTile label="Gross Sale" />
        <DashBoardTile label="Gross Profit" />
        <DashBoardTile label="Total Product Sale" />
      </div>
      <div className="col">
        <div className="row mb-3 p-2 rounded border">
          <h3 className="mx-3">Sales by Day</h3>
          <MonthlySaleChart height={350} width="100%" />
        </div>
        <div className="row">
          <div className="col p-2 rounded border">
            <h3 className="mx-3">Top Selling Branches</h3>
            <MonthlyBranchChart height={250} width="100%" />
          </div>
          <div className="col p-2 rounded border">
            <h3 className="mx-3">Top Selling Products</h3>
            <MonthlyProductChart height={250} width="100%" />
          </div>
        </div>
        <div className="row my-3 p-2 rounded border">
          <h3 className="mx-3">Sales Today on {currentUser.branch_name}</h3>
          <SaleHistoryView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
