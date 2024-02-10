const express = require("express");
const User = require("../models/User");
const {login, registerUser } = require("../controlers/auth");
const AppError = require("../utils/apperror");
const { logvalid } = require("../utils/validation");




const router = express.Router();

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// POST create a new user
router.post("/register", registerUser);
//loginuser
router.post("/login",//logvalid
 login);




// PATCH update user by ID
router.patch("/:id", async (req, res, next) => {
  try {
    // Implement logic to update user by ID
    res.send([]);
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// GET user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.send(user);
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    // Implement logic to delete user by ID
    res.send({});
  } catch (err) {
    next(new AppError(err.message, 500));
  }
});

module.exports = router;
