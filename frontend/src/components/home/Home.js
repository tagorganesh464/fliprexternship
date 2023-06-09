import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './home.css';

function Home() {
  return (
    <div className='home-container'>
      <div className='text-center home-content newmodule'>
      <h1>Welcome Back !</h1>
      <p className='lead'>Please login to acces the system ..</p>
      </div>
      <footer className='footer'>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default Home;
