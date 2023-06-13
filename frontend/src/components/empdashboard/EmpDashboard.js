import "../global.css"
import './empdashboard.css';
import { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import {useEffect} from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const EmpDashboard = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [timeTaken, setTimeTaken] = useState('');
  let [err, setError] = useState("");
  let token = sessionStorage.getItem("token");
  const [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);


  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + 330); // Adjust for GMT+5:30
    return now.toISOString().slice(0, 16);
  };
  const addTask = () => {
    const newTask = {
      taskDescription,
      taskType,
      startTime,
      timeTaken,
    };
    setTasks([...tasks, newTask]);
    axios.put("http://localhost:5000/user-api/add-users-task",[currentUser,tasks], { headers: { "Authorization": "Bearer " + token } })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message)
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
    handleClose();
  };

  return (
    <div className="container ">
      <Card className="card">
        <Card.Body>
          <Card.Title>Welcome Back - {currentUser.username}</Card.Title>
          <Button variant="primary" onClick={handleShow}>Add Task<i className="fas fa-edit"></i></Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} backdrop="static" centered className='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="taskType">
              <Form.Label>Task Type</Form.Label>
              <Form.Control
                as="select"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              >
                <option value="">Select Task Type</option>
                <option value="Break">Break</option>
                <option value="Meeting">Meeting</option>
                <option value="Work">Work</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min={currentUser.jod}
                max={getCurrentDateTime().slice(0, 10) + 'T23:59'}
              />
            </Form.Group>
            <Form.Group controlId="timeTaken">
              <Form.Label>Time Taken (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={timeTaken}
                onChange={(e) => setTimeTaken(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={addTask}>
              Add Task
            </Button>
          </Modal.Footer>
        </Modal>
{/*   
        <div>
          <h3>Tasks:</h3>
          {tasks.map((task, index) => (
            <div key={index}>
              <p>Task Description: {task.taskDescription}</p>
              <p>Task Type: {task.taskType}</p>
              <p>Start Time: {task.startTime}</p>
              <p>Time Taken: {task.timeTaken} minutes</p>
              <hr />
            </div>
          ))}
        </div> */}
      </div>
    );
  }
  
  export default EmpDashboard;
  

