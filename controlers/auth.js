const AppError = require("../utils/apperror");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    // if (!email || !password) {
    //   return next(new AppError("Email and password are required", 400));
    // }

    // Get user by email
    const user = await User.findOne({ email }).select("+password");

    // Check if the user exists
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret);

    // Password is valid, send user data without password and include the token in the response
    user.password = undefined;
    res.status(200).json({ user, token });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Not a valid email or password", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({ email, password: hashedPassword });
    userCreated.password = undefined;

    res.status(201).send(userCreated);
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

module.exports = {
  registerUser,
  login,
};
