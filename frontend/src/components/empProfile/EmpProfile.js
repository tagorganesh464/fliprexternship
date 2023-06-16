import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { loginContext } from '../../context/loginContext';
import { taskContext } from "../../context/TasksContextProvider";
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import './empProfile.css';

function EmpProfile() {
  let [currentUser, err, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);
  let token = sessionStorage.getItem('token');
  let [error, setError] = useState('');
  let [tasks,setTasks]=useContext(taskContext)
  //state of user to edit
  let [userToEdit, setUserToEdit] = useState({});
  // State variable to hold the updated user details
  const [updatedUser, setUpdatedUser] = useState({});

  //useForm
  let {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const userObj = currentUser;
  //navigate hook
  let navigate = useNavigate();
  //modal state
  const [show, setShow] = useState(false);

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
  const editUser = (userToEdit) => {
    console.log(userToEdit);
    //show modal
    handleShow();
    //set user edit state
    setUserToEdit(userToEdit);
    //set values to edit for
    setValue('username', userToEdit.username);
    setValue('password', userToEdit.password);
    setValue('phone', userToEdit.phone);
    setValue('department', userToEdit.department);
  };
 

  //save modified user
  const saveUser = () => {
    //close modal
    handleClose();

    //get values from form
    let modifiedUser = getValues();
    console.log(modifiedUser);
    //add id
    modifiedUser.name = userToEdit.username;
    console.log(modifiedUser.name);
    //modify user in DB
    axios
      .put(`http://localhost:5000/user-api/update-user/${modifiedUser.name}`, modifiedUser, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          setUpdatedUser(modifiedUser);
          getUsers();
        }
        if (response.status !== 200) {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        } else if (err.request) {
          setError(err.message);
        } else {
          setError(err.message);
        }
      });
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
        <Modal.Body className="edit-form">
          <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-center">Edit Profile</h3>
          {/* edit form */}
          <form onSubmit={handleSubmit(saveUser)}>
            {/* name */}
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="username"
                placeholder="namexyz"
                {...register('username')}
              />
              <label htmlFor="username">Name</label>
            </div>
            <div className="inputbox form-floating mb-3">
              <input
                type="text"
                className="form-control form-inp"
                id="password"
                placeholder="Password"
                {...register('password')}
              />
              <label htmlFor="department">Password</label>
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
              <Button variant="primary" className="btn-sm" onClick={saveUser}>
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
