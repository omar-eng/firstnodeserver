const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const todosRoutes = require("./routes/todosRoutes");
const cors = require('cors')

const app = express();
const port = 3300;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(cors())
// app.use(express.static("public"));

// Routes
app.use("/users", userRoutes);
app.use("/todos", todosRoutes);

// Database Connection
const dbURI = `mongodb+srv://omar010:${process.env.mongopass}@cluster0.zlqj0ym.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log(`Something went wrong with the database: ${err}`));

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).send({
    statusCode,
    message: err?.message || "Internal Server Error",
    errors: err?.errors || [],
  });
});

// Server Listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
