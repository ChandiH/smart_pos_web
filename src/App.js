import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/navBar";
import UserContext from "./context/UserContext";
import {
  Login,
  Dashboard,
  ConfigScreen,
  NotFound,
  Customers,
  CustomerForm,
  ProductCatalog,
  ProductForm,
  Discount,
  Categories,
  EmployeeList,
  EmployeeForm,
  EmployeeProfile,
  UserRoles,
  UpdateInventory,
  StockUpdateForm,
  AccessDenied,
  CashierSalePage,
  UserProfile,
} from "./screens";
import "./App.css";
import CartContext from "./context/CartContext";

function App() {
  // ** REMOVE THIS AFTER TESTING **
  // use when need to bypass login
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Somesh Chandimal",
    userName: "Somesh",
    email: "slahy0@trellian.com",
    phone: "6953579061",
    branch_id: 1,
    userRole_id: 1,
  });

  // const [currentUser, setCurrentUser] = useState(null);

  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
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
            {/* <div className="row" style={{ backgroundColor: "#282C35" }}>
              <div className="col-3">
                <SideBar />
              </div>
              <div
                className="col"
                style={{ backgroundColor: "white", borderWidth: 5 }}
              > */}
            <Switch>
              {/* Employees Management */}
              <Route path="/employee/roles" component={UserRoles} />
              <Route path="/employee/profile" component={EmployeeProfile} />
              <Route path="/employee/:id" component={EmployeeForm} />
              <Route path="/employee" component={EmployeeList} />
              {/* Inventory Management */}
              <Route path="/inventory/catalog" component={ProductCatalog} />
              <Route path="/inventory/discounts" component={Discount} />
              <Route path="/inventory/categories/:id" component={Categories} />
              <Route path="/inventory/update/:id" component={StockUpdateForm} />
              <Route path="/inventory/update" component={UpdateInventory} />
              <Route path="/inventory/:id" component={ProductForm} />
              {/* Customer Management */}
              <Route path="/customers/:id" component={CustomerForm} />
              <Route path="/customers" component={Customers} />
              {/* Common */}
              <Route path="/sale" component={CashierSalePage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/user-profile" component={UserProfile} />
              <Route path="/config" component={ConfigScreen} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/access-denied" component={AccessDenied} />
              <Redirect from="/" exact to="/dashboard" />
              <Redirect to="/not-found" />
            </Switch>
            {/* </div> */}
            {/* </div> */}
          </React.Fragment>
        )}
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
