const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/User");


const todoschema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoschema);

module.exports = Todo;
