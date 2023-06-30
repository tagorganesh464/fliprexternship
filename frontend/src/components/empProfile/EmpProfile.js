import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { taskContext } from "../../context/TasksContextProvider";
import { useForm } from "react-hook-form";
import { loginContext } from "../../context/loginContext";
import {domainContext} from "../../context/DomainContextProvider"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./empProfile.css";
import Tilt from "react-vanilla-tilt";

const EmpProfile = () => {
  let [domain,setDomain]=useContext(domainContext)
  let [tasks, setTasks] = useContext(taskContext);
  let [error, setError] = useState("");
  let token = sessionStorage.getItem("token");
  let [
    currentUser,
    err,
    userLoginStatus,
    loginUser,
    logoutUser,
    role,
  ] = useContext(loginContext);
  let {
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
    .get(`${domain}/user-api/get-emp/${currentUser.email}`, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.status === 200) {
          setTasks(response.data.payload);
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
    // reset();
  };

  // edit user
  const editUser = (userObj) => {
    handleShow();
    setUserToEdit(userObj);
    setValue("username", userObj?.username);
    setValue("jod", userObj?.jod);
    setValue("department", userObj?.department);
    setValue("email", userObj?.email);
    setValue("phone", userObj?.phone);
  };

  // save modified user
  const saveModifiedUser = () => {
    if (Object.keys(errors).length === 0) {
      let modifiedUser = getValues();

     
      axios
        .put(`${domain}/user-api/update-user`, modifiedUser, {
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

      handleClose();
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container users-data d-flex justify-content-center align-items-center emp-profil">
      <Tilt className="bg-transparent p-0 text-white border-0 rounded-0 lh-0 shadow-none d-bolck m-auto mt-5" style={{ width: "800px" }}>
        <div className="emp-style">
          <div className="employee">
            <h1 className="name">{tasks?.username}</h1>
            <p className="department">Dept - {tasks?.department}</p>
            <p className="email">Email - {tasks?.email}</p>
            <p className="phone">Ph: {tasks?.phone}</p>
            <p className="doj">DOJ - {tasks?.jod}</p>
            <button className="btn btn-warning float-start" onClick={() => editUser(tasks)}>
              Edit
            </button>
          </div>
        </div>
      </Tilt>

      {/* Modal to edit user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={false}
        centered
        className="modal transparent-backdrop"
      >
        <Modal.Body className="edit-form block">
          <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Edit Profile</h3>
          {/* Edit form */}
          <form onSubmit={handleSubmit(saveModifiedUser)}>
            {/* Username */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                id="username"
                className="form-control form-inp"
                {...register("username", {
                  required: true,
                  minLength: 4,
                  maxLength: 10,
                })}
                placeholder="xyz"
              />
              <label htmlFor="username" className="text-dark">
                User Name
              </label>

              {errors.username?.type === "required" && (
                <p className="text-danger">* Enter your username</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-danger">
                  * Minimum 4 characters for the username are required
                </p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className="text-danger">
                  * Maximum 10 characters for the username are allowed
                </p>
              )}
            </div>

            {/* Password */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                id="password"
                className="form-control form-inp"
                placeholder="xyz"
                {...register("password", {
                  required: true,
                  minLength: 4,
                })}
              />
              <label htmlFor="password" className="text-dark">
                Password
              </label>

              {errors.password?.type === "required" && (
                <p className="text-danger">* Enter your password</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-danger">
                  * Minimum 4 characters for the password are required
                </p>
              )}
            </div>

            {/* Email */}
            <div className="inputbox form-floating mb-3">
              <input
                type="email"
                className="form-control form-inp"
                id="email"
                placeholder="email"
                {...register("email")}
                disabled
              />
              <label htmlFor="email">Email</label>
            </div>

            {/* Department */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="department"
                placeholder="Department"
                {...register("department")}
              />
              <label htmlFor="department">Department</label>
            </div>

            {/* Phone Number */}
            <div className="inputbox form-floating mb-3">
              <input
                type="tel"
                className="form-control form-inp"
                id="phone"
                placeholder="Phone Number"
                {...register("phone")}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            {/* Place the buttons within the modal body */}
            <div className="d-flex justify-content-end">
              <Button variant="danger" className="btn-sm me-2" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" className="btn-sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmpProfile;
