import React from 'react';
import { useNavigate } from 'react-router-dom';
import Graphs from '../graphs/Graphs';
import "./UserDetails.css"
import TaskList from '../taskslist/TaskList'

function UserDetails() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/users'); // Navigate to the /users page
  };

  return (
    <div className='users-details-style'>
      <button className="btn btn-danger"    onClick={handleGoBack}>Back</button> {/* Back button */}
      <div>
      <Graphs />
      </div>
    </div>
  );
}

export default UserDetails;
