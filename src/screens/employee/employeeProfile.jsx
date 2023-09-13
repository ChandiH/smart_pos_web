import React, { useEffect, useState } from "react";
import SelectWithBtn from "../../components/common/selectWithBtn";
import { getUserRoles } from "../../services/fakeAuthorizationService";
import { getAllBranches } from "../../services/branchService";
import AccessFrame from "./../../components/accessFrame";

const EmployeeProfile = ({ history, location }) => {
  const [employee, setEmployee] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [branches, setBranches] = useState([]);

  const fetchData = async () => {
    const roles = await getUserRoles();
    const { data: branch } = await getAllBranches();
    setUserRoles(
      roles.map((role) => ({ _id: role.userRole_id, name: role.name }))
    );
    setBranches(branch.map((b) => ({ _id: b.id, name: b.city })));
  };

  useEffect(() => {
    if (!location.state) return history.replace("/not-found");
    setEmployee(location.state);
    console.log(location.state);
    fetchData();
  }, [history, location.state]);

  const renderDetails = (label, name) => (
    <div className="row mb-2">
      <span className="col-4 text-muted">{label}:</span>
      <span className="col-8">{name}</span>
    </div>
  );

  return (
    <AccessFrame
      accessLevel={"employeeDetails"}
      onDenied={() => history.replace("/access-denied")}
    >
      <div className="container my-3">
        <h2>Employee Profile</h2>
      </div>
      <section className="py-1">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-4">
              <div className="rounded-4 mb-3 mt-3 d-flex justify-content-ceter">
                <img
                  alt="display"
                  style={{ width: "60%", aspectRatio: 1, margin: "auto" }}
                  className="rounded-4 fit"
                  src={
                    employee.image
                      ? employee.image
                      : "https://placehold.co/400x400/png"
                  }
                />
              </div>
            </aside>

            <main className="col-lg-6 my-3">
              <h4 className="title text-dark">
                {employee.name} <br />
                <small className="text-muted">{employee.role_name}</small>
              </h4>
              <div className="col my-3">
                {renderDetails("Assigned Branch", employee.branch_name)}
                {renderDetails("Email", employee.email)}
                {renderDetails("Contact", employee.phone)}
              </div>
              <hr />
              <SelectWithBtn
                label="Assigned New Branch"
                placeHolder="Select Branch"
                options={branches}
              />
              <SelectWithBtn
                label="Change User Role"
                placeHolder="Select User Role"
                options={userRoles}
              />
            </main>
          </div>
        </div>
      </section>
    </AccessFrame>
  );
};

export default EmployeeProfile;
