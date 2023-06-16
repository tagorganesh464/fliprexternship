import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { taskContext } from "../../context/TasksContextProvider";
import Graphs from '../graphs/Graphs'
import "./Users.css";
import { useNavigate } from "react-router-dom";

const Users = () => {
  let [error, setError] = useState("");
  let [users, setUsers] = useState([]);
  let [selectedUser, setSelectedUser] = useState(null);
  let [showModal, setShowModal] = useState(false);
  let token = sessionStorage.getItem("token");
  let [tasks, setTasks] = useContext(taskContext);
  const navigate = useNavigate();

  const getUsers = () => {
    axios
      .get("http://localhost:5000/user-api/get-users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.payload);
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };

  const deleteUser = (user) => {
    axios
      .delete(`http://localhost:5000/user-api/delete-user/${user.username}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          getUsers();
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
          console.log(err.response);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    console.log(user)
    setTasks(user)
    navigate("/user-details")
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users">
      {error?.length !== 0 && (
        <p className="text-danger display-1"> {error}</p>
      )}
      <div className="py-5 users1">
        <main className="table d-block m-auto  ">
          <section className="table__header text-center">
            <h1 className="d-block m-auto">Employees</h1>
          </section>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Department</th>
                  <th>Joining date</th>
                  <th>Deactivate</th>
                  <th>Get Details</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.department}</td>
                    <td>{user.jod}</td>
                    <td>
                      <div className="wrapper">
                        <a
                          href="#"
                          className="alr"
                          onClick={() => deleteUser(user)}
                        >
                          <span className="spanl">Deactivate</span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="wrapper">
                        <a
                          href="#"
                          className="alr"
                          onClick={() => showUserDetails(user)}
                        >
                          <span className="spanl">Details</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Modal */}
      {/* {selectedUser && (
        <Modal show={showModal} onHide={() => setShowModal(false)} backdrop={false}
        centered
        className="modal transparent-backdrop for-modal-styling">
       
          <Modal.Body  className="user-edit-style">
            <h3>{selectedUser.username}</h3>
            <div className="modal-content">
      <Graphs/>
      </div>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Body>
      
        </Modal>
      )} */}
    </div>
  );
};

export default Users;
