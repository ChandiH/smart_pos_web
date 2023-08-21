import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// import Movies from "./components/movies";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import Customers from "./screens/customer/customer";
import Inventory from "./screens/inventory/inventory";
import NotFound from "./screens/notFound";
import NavBar from "./components/NavBar/navBar";
import "./App.css";
import EmployeeList from "./screens/employee/employee";
import UserRoles from "./screens/employee/userRoles";
import Discount from "./screens/inventory/discount";
import Categories from "./screens/inventory/categories";
import CustomerForm from "./screens/customer/customerForm";
import EmployeeForm from "./screens/employee/employeeForm";
import ProductForm from "./screens/inventory/productForm";

class App extends Component {
  render() {
    return (
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
              <Route path="/employee/new" component={EmployeeForm} />
              <Route path="/employee/roles" component={UserRoles} />
              <Route path="/employee" component={EmployeeList} />
              {/* Inventory Management */}
              <Route path="/inventory/new" component={ProductForm} />
              <Route path="/inventory/categories" component={Categories} />
              <Route path="/inventory/discounts" component={Discount} />
              <Route path="/inventory" component={Inventory} />
              {/* Customer Management */}
              <Route path="/customers/new" component={CustomerForm} />
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
    );
  }
}

export default App;
