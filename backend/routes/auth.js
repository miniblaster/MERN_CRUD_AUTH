const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const generateToken = (user) => {
  const token = jwt.sign({ _id: user._id }, JWT_SECRET);
  return token;
};

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already Exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = new User({ email, password: hash });
  console.log(hash);
  newUser
    .save()
    .then(() => res.json("user added!"))
    .catch((err) => res.status(400).json({ message: "Error occured" }));
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Can't find user" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error Occured" });
  }
});

module.exports = { router, authMiddleware };
