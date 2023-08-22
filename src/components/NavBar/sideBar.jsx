import React from "react";
import { NavLink } from "react-router-dom";
import "./sideBar.css";

const SideBar = () => {
  return (
    <nav id="sidebar">
      <button
        type="button"
        id="sidebarCollapse"
        class="btn btn-info"
        style={{ marginLeft: 10 }}
      >
        {/* <FormatListBulletedIcon /> */}
        toggle
      </button>
      <div class="sidebar-header">
        <NavLink className="nav-link" to="/dashboard">
          <h3>Dashboard</h3>
          <strong>DB</strong>
        </NavLink>
      </div>

      <ul class="list-unstyled components">
        {/* <li class="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <AccountTreeIcon />
            Branches
          </a>
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="#">Moratuwa</a>
            </li>
            <li>
              <a href="#">Colombo</a>
            </li>
            <li>
              <a href="#">Kandy</a>
            </li>
          </ul>
        </li> */}
        <li>
          <NavLink className="nav-link" to="/inventory">
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/employee">
            Employee
          </NavLink>
        </li>

        <li>
          <NavLink className="nav-link" to="/customers">
            Customer
          </NavLink>
        </li>
        {/* <li>
          <a
            href="#pageSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <i class="fas fa-copy"></i>
            Inventory
          </a>
          <ul class="collapse list-unstyled" id="pageSubmenu">
            <li>
              <NavLink className="nav-link" to="/inventory">
                List
              </NavLink>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li> */}
        <li>
          <NavLink className="nav-link" to="/customers">
            Cashier
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
