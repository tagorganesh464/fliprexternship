import React, { useContext, useEffect } from 'react';
import "../global.css"
import { loginContext } from '../../context/loginContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './login.css';


function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);

  const handleUserLogin = (userobj) => {
    loginUser(userobj);
  };

  useEffect(() => {
    if (userLoginStatus) {
      if (role === 'admin') {
        navigate('/users');
      } else {
        navigate('/emp-dashboard');
      }
    }
  }, [userLoginStatus, role]);

  return (
    <div className="login log-in">
    <div className="new-form">
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{ width: '185px' }} alt="logo" />
            </div>

            <p>Please login to your account</p>

            {error && (
              <h1 className="text-danger">{error}</h1>
            )}

            <form onSubmit={handleSubmit(handleUserLogin)}>
           
  <div className="inputbox form-floating item1">
      <i className="fa-regular fa-user"></i>
      <input
        type="text"
        id="username"
        className="form-control "
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 22,
        })}
        placeholder="xyz"
      ></input>
        <label htmlFor="username" className="text-dark" >
        UserName
      </label>
      {errors.username?.type === "required" && (
        <p className=" text-danger">*enter your first name</p>
      )}
      {errors.username?.type === "minLength" && (
        <p className=" text-danger">*minimum 3 letter word is required</p>
      )}
      {errors.username?.type === "maxLength" && (
        <p className=" text-danger">
          *maximum 22 letter word is required
        </p>
      )}
    </div>
  <div className="inputbox form-floating item1">
      <i className="fa-solid fa-lock"></i>
     
      <input
        type="password"
        id="password"
        className="form-control "
        {...register("password", { required: true, minLength: 4 })}
        placeholder="xyz"
      ></input>
       <label htmlFor="password" className="text-dark">
        Password
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

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">Login</MDBBtn>
              </div>
            </form>
          </div>
        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
    </div>
  );
}

export default Login;
