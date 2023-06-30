import React, { useState } from 'react';
import "../global.css"
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
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
import { domainContext } from "../../context/DomainContextProvider";
import img from '../../images/photo-1684194952323-332460c595e2.avif'

const AddUser = () => {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  let [domain,setDomain]=useContext(domainContext)

  const formSubmit = (newUser) => {
    newUser = { ...newUser, role: "employee", tasks: [] };

    axios
      .post(`${domain}/user-api/add-user`, newUser)
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
    
	 <div className="add-user-style">
    <div
    className="add-user-container navi-6"
  
  ><div class="rainbow">
      
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-4 navi-8">
          <MDBCol md="12">
          <div className="wider-card-wrapper ">
           
                <h3 className="fw-bold mb-2 text-dark">
                  Add new employee
                </h3>

                {error && (
                  <p className="text-danger display-1">{error}</p>
                )}

                <form onSubmit={handleSubmit(formSubmit)}>
                  <div className="wider-inputs">
                  <div className='navi-4'> 
                  <div className="inputbox1 form-floating">
                    <i className="fa-regular fa-user"></i>
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
</div>

                  <div className='navi-4'>
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      id="password"
                      className="form-control "
                      placeholder="xyz"
                      {...register("password", {
                        required: true,
                        minLength: 4,
                      })}
                    ></input>
                    <label htmlFor="password" className="text-dark">
                      password
                    </label>

                    {errors.password?.type === "required" && (
                      <p className=" text-danger">*enter your password</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className=" text-danger">
                        *minimum 4 password word is required
                      </p>
                    )}
                  </div>
                  </div>
                  <div className='navi-4'>
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-calendar-days"></i>
                    <input
                      type="date"
                      id="jod"
                      className="form-control "
                      placeholder="xyz"
                      {...register("jod", { required: true })}
                    ></input>
                    <label htmlFor="jod" className="text-dark">
                      joining date
                    </label>

                    {errors.jod?.type === "required" && (
                      <span className="text-sm text-danger">
                        *joining date is required
                      </span>
                    )}
                  </div>
                
                  </div>
                  <div className='navi-4'> 
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-user-magnifying-glass"></i>
                    <input
                      type="text"
                      id="department"
                      className="form-control "
                      placeholder="xyz"
                      {...register("department", { required: true })}
                    ></input>
                    <label htmlFor="department" className="text-dark">
                      Department
                    </label>

                    {errors.department?.type === "required" && (
                      <p className=" text-danger">*enter your department</p>
                    )}
                  </div>
                  </div>
                  <div className='navi-4'> 
                 
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      className="form-control "
                      placeholder="xyz"
                      {...register("email", { required: true })}
                    ></input>
                    <label htmlFor="email" className="text-dark">
                      Email
                    </label>

                    {errors.email?.type === "required" && (
                      <p className=" text-danger">*enter your valid email id</p>
                    )}
                  </div>
                  </div>
                  <div className='navi-4'> 
                  <div className="inputbox1 form-floating">
                    <i className="fa-solid fa-phone"></i>
                    <input
                      type="number"
                      id="phone"
                      className="form-control "
                      placeholder="xyz"
                      {...register("phone", { required: true, maxLength: 11 })}
                    ></input>
                    <label htmlFor="phone" className="text-dark">
                      Phone Number
                    </label>

                    {errors.phone?.type === "required" && (
                      <p className=" text-danger">*enter your Phone number</p>
                    )}
                    {errors.phone?.type === "maxLength" && (
                      <p className=" text-danger">
                        *maximum number length should be 10
                      </p>
                    )}
                  </div>
                  </div>
                  </div>

                  <MDBBtn className="mb-3" size="lg" type="submit">
                    Submit
                  </MDBBtn>
                </form>
            
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </div>
</div>
      
     
  );
};

export default AddUser;
