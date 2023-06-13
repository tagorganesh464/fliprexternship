import React, { useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import "./navbar.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
function NavbarMain() {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);

  return (
    <Navbar expand="lg" className="p-0 body text-white">
      <div className="container-fluid px-3 body1">
        <div>
          <Link className="nav-link" to="/">
            {" "}
            <div>
      <FaHome size={32} />
    </div>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  ">
            <ul className="navbar-nav menu ms-auto text-decoration-none">
              <li className="nav-item active">
                <Link
                  className="nav-link text-white "
                  style={{ padding: "1.3rem" }}
                  to="/"
                >
                  Home
                </Link>
              </li>

              {!userLoginStatus ? (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link text-white  "
                    style={{ padding: "1.3rem" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link text-white"
                    style={{ padding: "1.3rem" }}
                    to="/login"
                    onClick={logoutUser}
                  >
                    LogOut
                  </Link>
                </li>
              )}

              {userLoginStatus && role == "admin" ? (
                <ul className="navbar-nav menu ms-auto text-decoration-none">
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link text-white"
                      style={{ padding: "1.3rem" }}
                      to="/add-user"
                    >
                      Add Employees
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link text-white"
                      style={{ padding: "1.3rem" }}
                      to="/users"
                    >
                      Employees
                    </Link>
                  </li>
                </ul>
              ) : (
                userLoginStatus && (
                  <ul className="navbar-nav menu ms-auto text-decoration-none">
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link text-white"
                        style={{ padding: "1.3rem" }}
                        to="/emp-dashboard"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link text-white"
                        style={{ padding: "1.3rem" }}
                        to="/add-task"
                      >
                        Add Task
                      </Link>
                    </li>
                  </ul>
                )
              )}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavbarMain;
