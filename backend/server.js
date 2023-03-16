const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// connect to mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// API routes
app.use('/auth', authRouter.router)
app.use("/tasks", tasksRouter);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
