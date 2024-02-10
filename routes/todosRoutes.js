const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const jwt= require('jsonwebtoken');
const User = require("../models/User");
const AppError = require("../utils/apperror");
require("dotenv").config();
/** Todos Routes */
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Middleware to verify user
const varfyuser = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("Authorization");

    if(!token){return next(new AppError('Token error',403));}

    // 2. Verify token (using jwt package) and return payload
    const decoded = jwt.verify(token,process.env.jwt_secret ); 
    // console.log(decoded);

    // 3. Get user from the database based on the payload
    const user = await User.findById(decoded.id);
    if(!user){return next(new AppError('invalid user',401));}

    // 4. Attach user to req.user
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.post("/",

varfyuser
, (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({ title, user:req.user._id });
    res.status(201).send({status:"Created",todo:newTodo});
  } catch (error) {
    res.status(500).json({ message: "to do Error" });
  }
});

router.patch("/:id",  (req, res) => {
  try {
    // Implement logic to update a todo by ID
    res.send({});
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id",  (req, res) => {
  try {
    const todo =  Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id",  (req, res) => {
  try {
    // Implement logic to delete a todo by ID
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
