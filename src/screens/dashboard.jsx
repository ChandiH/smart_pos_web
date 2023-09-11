import React, { useEffect } from "react";
import MonthlySaleChart from "../components/charts/monthlySaleChart";
import MonthlyBranchChart from "../components/charts/monthlyBranchChart";
import MonthlyProductChart from "./../components/charts/monthlyProductChart";
import { useContext } from "react";
import UserContext from "./../context/UserContext";

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
    <div className="col mt-3">
      <div className="row">
        <h3 className="mx-3">Sales by Day</h3>
        <div className="mx-3">
          <MonthlySaleChart height={350} width="95%" />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <h3 className="mx-3">Top Selling Branches</h3>
          <MonthlyBranchChart height={250} width="100%" />
        </div>
        <div className="col-6">
          <h3 className="mx-3">Top Selling Products</h3>
          <MonthlyProductChart height={250} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
