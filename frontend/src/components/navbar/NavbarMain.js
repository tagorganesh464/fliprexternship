import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { loginContext } from "../../context/loginContext";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

// Import the updated navbar.css file
import "./navbar.css";

function NavbarMain() {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);

  return (
    <div className="navig">
      <Navbar bg="light" expand="lg" className="p-0 hello">
        <div className="container-fluid mx-3">
          <div>
            <Link className="nav-link" to="/">
              <FaHome size={32} />
            </Link>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <ul className="navbar-nav nav-tabs ms-auto text-decoration-none">
                <li className="nav-item active">
                  <Link className="nav-link" style={{ padding: "1.3rem" }} to="/">
                    Home
                  </Link>
                </li>

                {!userLoginStatus ? (
                  <li className="nav-item dropdown">
                    <Link className="nav-link" style={{ padding: "1.3rem" }} to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link"
                      style={{ padding: "1.3rem" }}
                      to="/login"
                      onClick={logoutUser}
                    >
                      LogOut
                    </Link>
                  </li>
                )}

                {userLoginStatus && role === "admin" ? (
                  <ul className="navbar-nav nav-tabs ms-auto text-decoration-none">
                    <li className="nav-item dropdown">
                      <Link className="nav-link" style={{ padding: "1.3rem" }} to="/add-user">
                        Add Employees
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" style={{ padding: "1.3rem" }} to="/users">
                        Employees
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" style={{ padding: "1.3rem" }} to="/removed-users">
                        Removed Employees
                      </Link>
                    </li>
                  </ul>
                ) : (
                  userLoginStatus && (
                    <ul className="navbar-nav nav-tabs ms-auto text-decoration-none">
                      <li className="nav-item dropdown">
                        <Link className="nav-link" style={{ padding: "1.3rem" }} to="/emp-dashboard">
                          Dashboard
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
    </div>
  );
}

export default NavbarMain;
