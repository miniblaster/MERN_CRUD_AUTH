import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { ADD_TASK_URL } from "../consts";

import "react-toastify/dist/ReactToastify.css";

const TaskAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showErrorToast = (message) => {
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      showErrorToast("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post(ADD_TASK_URL, { name, description });
      setLoading(false);
      navigate("/tasklist");
    } catch (error) {
      setLoading(false);
      showErrorToast(error.message);
      setTimeout(() => {
        navigate("/tasklist");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={() => navigate("/tasklist")}>
        {"back"}
      </button>
      <h1>Add task</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Button
          variant={!loading ? "primary" : "info"}
          type="submit"
          className="mt-2"
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" variant="danger" />
          ) : (
            "Add Task"
          )}
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default TaskAdd;
