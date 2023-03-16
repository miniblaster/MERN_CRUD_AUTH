import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import { LOGIN_URL } from "../consts";
import useAuth from "../hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("All fiels are required!");
      return;
    }
    setIsLoading(true);
    axios
      .post(LOGIN_URL, { email, password })
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("token", res.data.token);
        setAuthenticated(true);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message || "Error occured");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/tasklist");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("token")]);

  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center">Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        <Button className="btn-custom mt-4" variant="primary" type="submit">
          {isLoading ? (
            <Spinner size="sm" animation="border"></Spinner>
          ) : (
            "Login"
          )}
        </Button>
        <p>
          Do not have an account <Link to={"/signup"}>Signup</Link>{" "}
        </p>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Login;
