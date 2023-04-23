const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const user = await User.findOne({ username });
    if (user) throw new Error("User already exists");
    else {
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.send({
        status: 201,
        message: "Register Success",
      });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (!user) throw new Error("Wrong credential!");
    else {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) throw new Error("Wrong credential!");
      else {
        const payload = {
          id: user._id,
          username: user.username,
        };

        const privateKey = process.env.JWT_PRIVATE_KEY;

        const token = jwt.sign(payload, privateKey, { expiresIn: "2d" });

        const { password, ...others } = user._doc;

        res.send({
          status: 200,
          message: "Login successful",
          token: "Bearer " + token,
          user: others,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};

exports.getUserInfo = (req, res) => {
  const { password, ...others } = req.user._doc;
  res.send(others);
};

exports.getConnectionInfo = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) throw new Error("No user found");
    const { username } = user;
    res.send(username);
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};
