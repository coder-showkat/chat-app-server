const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");
const chatRouter = require("./routes/chat.route");
const messageRouter = require("./routes/message.route");
const app = express();
require("dotenv").config();
require("./config/db");

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// all routes
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

// home route
app.get("/", (req, res) => {
  res.send("<h1>Server is running properly</h1>");
});

// no route message
app.use((req, res, next) => {
  res.status(404).send({ message: "No route matched" });
});

// server error message
app.use((err, req, res, next) => {
  res.status(500).send({ message: "Server error" });
});

module.exports = app;
