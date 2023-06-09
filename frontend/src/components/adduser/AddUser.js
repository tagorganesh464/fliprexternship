import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './AddUser.css';
import img from '../../images/photo-1684194952323-332460c595e2.avif'

const AddUser = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const formSubmit = (newUser) => {
    newUser = { ...newUser, role: 'employee' };

    axios
      .post('http://localhost:5000/user-api/add-user', newUser)
      .then((response) => {
        if (response.status === 201) {
          navigate('/users');
        } else {
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

  return (
    <section>
    <div
    className="add-user-container navi-6"
  
  >
      
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-5 navi-8">
          <MDBCol md="12">
          <div className="wider-card-wrapper ">
           
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                  Add new employee
                </h3>

                {error && (
                  <p className="text-danger display-1">{error}</p>
                )}

                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="wider-inputs">
                  <div className='navi-4'> 
  <MDBRow>
    <MDBCol md="12">
      <MDBInput
        label="Employee Name"
        size="lg"
        id="username"
        type="text"
        {...register('username', {
          required: 'Please enter your username',
          minLength: {
            value: 4,
            message: 'Username should be at least 4 characters long',
          },
          maxLength: {
            value: 10,
            message: 'Username should not exceed 10 characters',
          },
        })}
      />
      {errors.username && (
        <p className="text-danger">
          {errors.username.message}
        </p>
      )}
    </MDBCol>
  </MDBRow>
</div>

                  <div className='navi-4'>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Password"
                        size="lg"
                        id="password"
                        type="password"
                        {...register('password', {
                          required: 'Please enter your password',
                          minLength: {
                            value: 4,
                            message:
                              'Password should be at least 4 characters long',
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-danger">
                          {errors.password.message}
                        </p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  </div>
                  <div className='navi-4'>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Joining Date"
                        size="lg"
                        id="jod"
                        type="date"
                        {...register('jod', {
                          required: 'Please enter your joining date',
                        })}
                      />
                      {errors.jod && (
                        <p className="text-sm text-danger">
                          {errors.jod.message}
                        </p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  </div>
                  <div className='navi-4'> 
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Department"
                        size="lg"
                        id="department"
                        type="text"
                        {...register('department', {
                          required: 'Please enter your department',
                        })}
                      />
                      {errors.department && (
                        <p className="text-danger">
                          {errors.department.message}
                        </p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  </div>
                  <div className='navi-4'> 
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Email"
                        size="lg"
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Please enter a valid email address',
                        })}
                      />
                      {errors.email && (
                        <p className="text-danger">
                          {errors.email.message}
                        </p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  </div>
                  <div className='navi-4'> 
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput
                        label="Phone Number"
                        size="lg"
                        id="phone"
                        type="number"
                        {...register('phone', {
                          required: 'Please enter your phone number',
                          maxLength: {
                            value: 11,
                            message: 'Phone number should be 11 digits long',
                          },
                        })}
                      />
                      {errors.phone && (
                        <p className="text-danger">
                          {errors.phone.message}
                        </p>
                      )}
                    </MDBCol>
                  </MDBRow>
                  </div>
                  </div>

                  <MDBBtn className="mb-4" size="lg" type="submit">
                    Submit
                  </MDBBtn>
                </form>
            
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </section>
  );
};

export default AddUser;
