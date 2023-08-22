import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  Login,
  Dashboard,
  NotFound,
  Customers,
  CustomerForm,
  Inventory,
  ProductForm,
  Discount,
  Categories,
  EmployeeList,
  EmployeeForm,
  UserRoles,
} from "./screens";
import NavBar from "./components/NavBar/navBar";
import UserContext from "./context/UserContext";
import "./App.css";

function App() {
  // const [currentUser, setCurrentUser] = useState({ name: "somesh Chandimal" });
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider
      value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}
    >
      {!currentUser && (
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
      {currentUser && (
        <React.Fragment>
          <NavBar />
          <div className="row" style={{ backgroundColor: "#282C35" }}>
            {/* <div className="col-3"><SideBar /></div> */}
            <div
              className="col"
              style={{ backgroundColor: "white", borderWidth: 5 }}
            >
              <Switch>
                {/* Employees Management */}
                <Route path="/employee/:id" component={EmployeeForm} />
                <Route path="/employee/roles" component={UserRoles} />
                <Route path="/employee" component={EmployeeList} />
                {/* Inventory Management */}
                <Route path="/inventory/:id" component={ProductForm} />
                <Route path="/inventory/categories" component={Categories} />
                <Route path="/inventory/discounts" component={Discount} />
                <Route path="/inventory" component={Inventory} />
                {/* Customer Management */}
                <Route path="/customers/:id" component={CustomerForm} />
                <Route path="/customers" component={Customers} />
                {/* Common */}
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/dashboard" />
                <Redirect to="/not-found" />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      )}
    </UserContext.Provider>
  );
}

export default App;
