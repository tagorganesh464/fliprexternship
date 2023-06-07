import React, { useContext } from 'react';
import { loginContext } from '../../context/loginContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdb-react-ui-kit';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currentUser, error, userLoginStatus, loginUser, logoutUser, role] = useContext(loginContext);

  const handleUserLogin = (userobj) => {
    loginUser(userobj);
  };

  React.useEffect(() => {
    if (userLoginStatus === true && role === 'admin') {
      navigate('/add-user');
    } else if (userLoginStatus === true) {
      navigate('/emp-dashboard');
    }
  }, [userLoginStatus]);

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0NUhTeL3TV7RLd70eqM-mmcByuUD2gkkb6rDeENMeOg&s"
                style={{ width: '185px' }} alt="logo" />
              
            </div>

            <p>Please login to your account</p>

            <form onSubmit={handleSubmit(handleUserLogin)}>
              <MDBInput
                wrapperClass='mb-4'
                label='User Name'
                id='username'
                type='text'
                {...register('username', {
                  required: true,
                  minLength: 4,
                  maxLength: 22
                })}
              />
              {errors.username?.type === 'required' && (
                <p className="text-danger">*enter your username</p>
              )}
              {errors.username?.type === 'minLength' && (
                <p className="text-danger">*minimum 4 letter word is required</p>
              )}
              {errors.username?.type === 'maxLength' && (
                <p className="text-danger">*maximum 22 letter word is required</p>
              )}

              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='password'
                type='password'
                {...register('password', { required: true, minLength: 4 })}
              />
              {errors.password?.type === 'required' && (
                <p className='text-danger'>*enter your password</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className='text-danger'>*minimum 4 password word is required</p>
              )}

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
  );
}

export default Login;
