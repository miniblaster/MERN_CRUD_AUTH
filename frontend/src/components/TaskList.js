import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Form, Spinner } from "react-bootstrap";

import { ALL_TASKS_URL, DELETE_TASK_URL, UPDATE_TASK_URL } from "../consts";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')

const TaskList = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTasks = useCallback(async () => {
    try {
      const { data } = await axios.get(ALL_TASKS_URL);
      setTasks(data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleClose = () => {
    setShow(false);
  };

  const deleteData = useCallback(
    (id) => {
      axios
        .delete(DELETE_TASK_URL + id)
        .then((res) => {
          console.log(res);
          getTasks();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    [getTasks]
  );

  const editData = useCallback(
    (id) => {
      setSelected(tasks[id]._id);
      setName(tasks[id].name);
      setDescription(tasks[id].description);
      setShow(true);
    },
    [tasks]
  );
  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(UPDATE_TASK_URL + selected, {
        name: name,
        description: description,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        handleClose();
        getTasks();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/')
  }
  const taskList = useMemo(
    () =>
      tasks.map((task, index) => (
        <tr key={task._id}>
          <td>{index + 1}</td>
          <td>{task.name}</td>
          <td>{task.description}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteData(task._id)}
            >
              Delete
            </button>
            <button className="btn btn-warning" onClick={() => editData(index)}>
              Edit
            </button>
          </td>
        </tr>
      )),
    [tasks, deleteData, editData]
  );

  return (
    <div className="container">
      <h1 className="mt-4 text-center">TaskList</h1>
      <div className="d-flex justify-content-between">
      <button className="btn btn-primary" onClick={() => navigate("/add")}>
        Add Task
      </button>
      <button className="btn btn-info" onClick={handleLogout}>
          Logout
      </button>
      </div>
      <table className="table table-border text-center">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{taskList}</tbody>
      </table>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                "Edit Task"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList;
