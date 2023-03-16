import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";

import { SIGNUP_URL } from "../consts";

import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault(); 

    if(!email || !password) {
      toast.error("All fiels are required!")
      return;
    }
    setIsLoading(true);
    axios.post(SIGNUP_URL, {email, password}).then(res=>{
      setIsLoading(false);
      navigate('/login')
    }).catch((err)=>{
      setIsLoading(false);
      toast.error(err.response.data.message || "Error occured")
    })
    
  };

  return (
    <Container className="Signup-container">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center">Signup</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </Form.Group>
        <Button className="btn-custom mt-4" variant="primary" type="submit">
          { isLoading?<Spinner size="sm" animation='border'></Spinner>: 'Signup'}
        </Button>
        <p>Already has an account? <Link to={'/login'}>Login</Link> </p>
      </Form>
      <ToastContainer/>
    </Container>
  );
};

export default Signup;
