import React, { useEffect, useContext, useState } from "react";
import SaleHistoryView from "../components/sale/saleHistortView";
import DashBoardTile from "../components/charts/dashboardTile";
import AccessFrame from "../components/accessFrame";

import UserContext from "./../context/UserContext";

import MonthlyProductChart from "./../components/charts/monthlyProductChart";
import MonthlySaleChart from "../components/charts/monthlySaleChart";
import MonthlyBranchChart from "../components/charts/monthlyBranchChart";

import Select from "../components/common/select";
import { getAllBranches } from "../services/branchService";

const Dashboard = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(currentUser.branch_id);

  const fetchData = async () => {
    const { data: branches } = await getAllBranches();
    const branchList = branches.map((b) => ({
      _id: b.branch_id,
      name: b.branch_city,
    }));
    setBranches(branchList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBranchSelect = (e) => {
    setSelectedBranch(e.currentTarget.value);
  };

  return (
    <AccessFrame
      accessLevel={"report"}
      onDenied={() => history.replace("/sale")}
      toastHidden={true}
    >
      <div className="container">
        <div className="row">
          <DashBoardTile label="Gross Sale" />
          <DashBoardTile label="Gross Profit" />
          <DashBoardTile label="Total Product Sale" />
        </div>
        <div className="col">
          <div className="mb-3 p-2 rounded border">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mx-3">Sales by Day</h3>
              <Select
                name={"branch"}
                value={selectedBranch}
                label={"SELECT BRANCH"}
                options={branches}
                onChange={handleBranchSelect}
                // error={errors[name]}
              />
            </div>
            <MonthlySaleChart
              height={350}
              width="100%"
              branch_id={selectedBranch}
            />
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
    </AccessFrame>
  );
};

export default Dashboard;
