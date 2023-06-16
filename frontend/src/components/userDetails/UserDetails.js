import React from 'react';
import { useNavigate } from 'react-router-dom';
import Graphs from '../graphs/Graphs';
import "./UserDetails.css"

function UserDetails() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/users'); // Navigate to the /users page
  };

  return (
    <div className='users-details-style'>
      <button className="btn btn-danger"    onClick={handleGoBack}>Back</button> {/* Back button */}
      <Graphs />
    </div>
  );
}

export default UserDetails;
