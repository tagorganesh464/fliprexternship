import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import "../global.css"
import "./Users.css";

const Users = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/user-api/get-users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.payload);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.response);
      });
  };

  // edit user
  const editUser = (userObj) => {
    handleShow();
    setUserToEdit(userObj);
    setValue("username", userObj.username);
    setValue("jod", userObj.jod);
    setValue("department", userObj.department);
    setValue("email", userObj.email);
    setValue("phone", userObj.phone);
  };

  const saveModifiedUser = () => {
    handleClose();
    const modifiedUser = getValues();

    axios
      .put("http://localhost:5000/user-api/update-user", modifiedUser)
      .then((response) => {
        if (response.status === 200) {
          getUsers();
        }
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.response);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="employee">
      {error.length !== 0 && <p className="text-danger display-1"> {error}</p>}

      <main className="table  d-block m-auto ">
        <section className="table__header text-center">
          <h1 className="d-block m-auto">Employees</h1>
        </section>
        <section className="table__body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Department</th>
                <th>Joining date</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      </main>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(saveModifiedUser)}>
            <div className="row">
              <div className="col">
                <label htmlFor="username" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control bg-light"
                  {...register("username", {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                  })}
                  disabled
                />
                {errors.username?.type === "required" && (
                  <p className="text-danger">*enter your first name</p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="text-danger">
                    *minimum 6 letter word is required
                  </p>
                )}
                {errors.username?.type === "maxLength" && (
                  <p className="text-danger">
                    *maximum 10 letter word is enough
                  </p>
                )}
              </div>
              <div className="col">
                <label htmlFor="jod" className="form-label">
                  Joining Date
                </label>
                <input
                  type="date"
                  id="jod"
                  className="form-control bg-light"
                  {...register("jod", { required: true })}
                />
                {errors.jod?.type === "required" && (
                  <p className="text-danger">*joining date is required</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="department" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  className="form-control bg-light"
                  {...register("department", { required: true })}
                />
                {errors.department?.type === "required" && (
                  <p className="text-danger">*enter your department</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control bg-light"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">*enter your valid email id</p>
                )}
              </div>
              <div className="col">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  className="form-control bg-light"
                  {...register("phone", { required: true, maxLength: 11 })}
                />
                {errors.phone?.type === "required" && (
                  <p className="text-danger">*enter your Phone number</p>
                )}
                {errors.phone?.type === "maxLength" && (
                  <p className="text-danger">
                    *maximum number length should be 10
                  </p>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveModifiedUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
