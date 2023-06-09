import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBSelect, MDBRadio, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './Users.css'

const Users = () => {
  let [error, setError] = useState("");
  let [users, setUsers] = useState([]);
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/user-api/get-users", { headers: { "Authorization": "Bearer " + token } })
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
  }, []);

  return (
    <div className='custom-background'>
      <MDBContainer fluid>
        <MDBRow className='justify-content-center align-items-center m-5'>
          <MDBCard>
            <MDBCardBody className='px-4'>
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Employees</h3>

              <MDBTable striped bordered hover responsive>
                <MDBTableHead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Department</th>
                    <th>Joining date</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.department}</td>
                      <td>{user.jod}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>

              {error?.length !== 0 && <p className='text-danger display-1'>{error}</p>}
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Users;