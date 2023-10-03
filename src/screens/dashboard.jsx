import React, { useEffect, useContext, useState } from "react";
import AccessFrame from "../components/accessFrame";

import UserContext from "./../context/UserContext";

import MonthlyProductChart from "./../components/charts/monthlyProductChart";
import MonthlySaleChart from "../components/charts/monthlySaleChart";
import MonthlyBranchChart from "../components/charts/monthlyBranchChart";

import Select from "../components/common/select";
import { getAllBranches } from "../services/branchService";

import DashBoardTile from "../components/charts/dashboardTile";
import { MdDataExploration, MdAddShoppingCart } from "react-icons/md";
import { getMonthlySummary } from "../services/reportService";


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
          <div className="col">
            <DashBoardTile
              label="Gross Sale"
              value={200}
              icon={<MdDataExploration />}
              prefix="LKR"
            />
          </div>
          <div className="col">
            <DashBoardTile
              label="Gross Profit"
              value={2132}
              icon={<MdDataExploration />}
              prefix="LKR"
            />
          </div>
          <div className="col">
            <DashBoardTile
              label="Total Orders"
              value={2132}
              icon={<MdAddShoppingCart />}
            />
          </div>
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
          </div>
        </div>
      </div>
    </AccessFrame>
  );
};

export default Dashboard;
