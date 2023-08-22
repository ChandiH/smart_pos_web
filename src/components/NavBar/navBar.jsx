import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-3" to="/">
        Smart POS
      </Link>
      <div className="col-2" style={{ marginLeft: 20 }}>
        <span className="row" style={{ color: "black", fontSize: 10 }}>
          Welcome,
        </span>
        <span className="row" style={{ color: "black", fontSize: 15 }}>
          {currentUser.name}
        </span>
      </div>

      <div className="col" />
      {/* <div className="dropdown col">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown button
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div> */}

      {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory">
            Inventory
          </NavLink>
          <NavLink className="nav-item nav-link" to="/employee">
            Employee
          </NavLink>
        </div>
      </div> */}

      <div className="col-2">
        <span className="row" style={{ color: "black", fontSize: 10 }}>
          Wednesday
        </span>
        <span className="row" style={{ color: "black", fontSize: 15 }}>
          23 March 2023
        </span>
      </div>

      <span style={{ color: "black", fontSize: 15 }}>{currentUser.name}</span>
      <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
        style={{ width: 40, aspectRatio: 1, marginLeft: 10, marginRight: 10 }}
        className="rounded-circle shadow-4"
        alt="Avatar"
      />
      <button
        className="btn btn-primary mx-3"
        onClick={() => setCurrentUser(null)}
      >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;
