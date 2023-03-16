const router = require("express").Router();
const Task = require("../models/task");
const { authMiddleware } = require("./auth");

const JWT_SECRET = process.env.JWT_SECRET || "secret"

// get all tasks
router.get("/", authMiddleware, (req, res) => {
  Task.find()
    .then(tasks => {
  
      res.json(tasks)})
    .catch(err => res.status(400).json("Error: " + err));
});

// create a new task
router.post("/add",authMiddleware,(req, res) => {
  const { name, description } = req.body;
  const newTask = new Task({ name, description });

  newTask
    .save()
    .then(() => res.json("Task added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// get a task by its id
router.get("/:id",(req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json("Error: " + err));
});

// update a task
router.put("/update/:id", authMiddleware, (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Task updated!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// delete a task
router.delete("/:id", authMiddleware, (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
