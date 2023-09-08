import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const date = new Date();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand mx-3" to="/">
        Smart POS
      </NavLink>

      <div className="col" />

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/sale">
            Sale
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory/catalog">
            Product Catalog
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory/update">
            Stock Update
          </NavLink>
          <NavLink className="nav-item nav-link" to="/employee">
            Employee
          </NavLink>
          <NavLink className="nav-item nav-link" to="/config">
            Config
          </NavLink>
        </div>
      </div>

      <div className="col-1 mx-3">
        <span
          className="row"
          style={{ color: "black", fontSize: 12, justifyContent: "end" }}
        >
          {days[date.getDay()]}
        </span>
        <span
          className="row"
          style={{ color: "black", fontSize: 15, justifyContent: "end" }}
        >
          {date.toUTCString().slice(6, 16)}
        </span>
      </div>

      <div className="col-1" style={{ marginLeft: 20, marginRight: 20 }}>
        <span
          className="row"
          style={{ color: "black", fontSize: 10, justifyContent: "end" }}
        >
          Welcome,
        </span>
        <span
          className="row"
          style={{
            color: "black",
            fontSize: 15,
            justifyContent: "end",
            textAlign: "right",
          }}
        >
          {currentUser.name}
        </span>
      </div>
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
        style={{ width: 40, aspectRatio: 1, marginLeft: 10, marginRight: 10 }}
        className="rounded-circle shadow-4"
        alt="Avatar"
      />
      <button
        className="btn btn-primary mx-3"
        onClick={() => setCurrentUser(null)}
        role="logOutButton"
      >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;
