import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/tasklist')
    }
  },[navigate])
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1>Welcome to my App</h1>
        <p>Please login or sign up to continue</p>
        <Button variant="primary" className="mr-3" onClick={()=>navigate('/login')}>Login</Button>
        <Button variant="secondary" className='ml-3' onClick={()=>navigate('/signup')}>Sign up</Button>
      </div>
    </div>
  );
};

export default LandingPage;
