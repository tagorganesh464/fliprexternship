import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { taskContext } from "../../context/TasksContextProvider";
import { useForm } from "react-hook-form";
import { loginContext } from "../../context/loginContext";

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal";
import "./empProfile.css";

const EmpProfile = () => {
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
      .get(`http://localhost:5000/user-api/get-emp/${currentUser.email}`, {
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
  //   saveModifiedUser
  const saveModifiedUser = () => {
    
    if(Object.keys(errors).length===0){
      let modifieduser = getValues();

      axios
        .put(`http://localhost:5000/user-api/update-user`, modifieduser, {
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
      <div className="emp-style">
     
          <div class="employee">
  <h1 class="name">{tasks?.username}</h1>
  <p class="department">Dept - {tasks?.department}</p>
  <p class="email">Email - {tasks?.email}</p>
  <p class="phone">Ph:  {tasks?.phone}</p>
  <p class="doj">DOJ - {tasks?.jod}</p>
  <button className="btn btn-warning float-start" onClick={() => editUser(tasks)}>
  Edit
</button>

</div>

     
      </div>

      {/* modal to edit user */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={false}
        centered
        className="modal transparent-backdrop"
      >
        <Modal.Body className="edit-form block">
          <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Edit Profile</h3>
          {/* edit form */}
          <form onSubmit={handleSubmit(saveModifiedUser)}>
            {/* name */}
            <div className="inputbox form-floating mb-3">
            <input
                    type="text"
                    id="username"
                    className="form-control "
                    placeholder="xyz"
                    {...register("username", {
                      required: true,
                      minLength: 4,
                      maxLength: 10,
                    })}
                  ></input>
                  <label htmlFor="username" className="text-dark">
                    User Name
                  </label>

                  {errors.username?.type === "required" && (
                    <p className=" text-danger">*enter your first name</p>
                  )}
                  {errors.username?.type === "minLength" && (
                    <p className=" text-danger">
                      *minimum 4 letter word is required
                    </p>
                  )}
                  {errors.username?.type === "maxLength" && (
                    <p className=" text-danger">
                      *maximum 6 letter word is required
                    </p>
                  )}
            </div>
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp text-dark"
                id="password"
                placeholder="xyz"
                {...register('password')}
              />
              <label htmlFor="password">Password</label>
            </div>
              {/* email */}
              <div className="inputbox form-floating mb-3">
              <input
                type="email"
                className="form-control form-inp"
                id="email"
                placeholder="email"
                {...register('email')}disabled
              />
              <label htmlFor="email">Email</label>
            </div>
            {/* department */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="department"
                placeholder="Department"
                {...register('department')}
              />
              <label htmlFor="department">Department</label>
            </div>
            {/* phone */}
            <div className="inputbox form-floating mb-3">
              <input
                type="tel"
                className="form-control form-inp"
                id="phone"
                placeholder="Phone Number"
                {...register('phone')}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>

            {/* Place the buttons within the modal body */}
            <div className="d-flex justify-content-end">
              <Button variant="danger" className="btn-sm me-2" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" className="btn-sm" onClick={saveModifiedUser}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EmpProfile;
