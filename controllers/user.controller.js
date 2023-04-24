const cloudinary = require('cloudinary').v2;
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("../config/cloudinary");
require("dotenv").config();


exports.registerUser = async (req, res) => {
  try {
    const avatar = req.file.path;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) throw new Error("Email already used in different account");
    else {
      const password = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({ avatar, fullname, email, password });
      await newUser.save();
      res.status(201).send({
        status: 201,
        message: "Register Success",
      });
    }
  } catch (error) {
    await cloudinary.uploader.destroy(req.file.filename); 
    res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Wrong credential!");
    else {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) throw new Error("Wrong credential!");
      else {
        const payload = {
          id: user._id,
          email: user.email,
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
    const { fullname, avatar } = user;
    res.send({fullname, avatar});
  } catch (error) {
    res.status(400).send({
      status: 400,
      error: error.message,
    });
  }
};
