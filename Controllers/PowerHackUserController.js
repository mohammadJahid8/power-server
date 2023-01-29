const PowerHackUser = require("../models/PowerHackUserModel");

const jwt = require("jsonwebtoken");
const axios = require("axios");
const bcrypt = require("bcrypt");

exports.registration = async (req, res) => {
  const email = await PowerHackUser.findOne({ email: req.body.email });

  if (email) {
    return res.status(400).json({
      message: "Email  already used!!",
    });
  } else {
    const data = new PowerHackUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await data.save();

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Signup Successfull!",
      token: token,
      result: result,
    });
  }
};

exports.login = async (req, res) => {
  const user = await PowerHackUser.findOne({
    email: req.body.email,
  });
  if (user) {
    const matchPassword = await user.matchPassword(req.body.password);
    console.log(matchPassword);
    if (matchPassword) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Signin Successfully!",
        token: token,
        result: {
          email: req.body.email,
          password: req.body.password,
        },
      });
    } else {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Email does not exists, Please signup first!",
    });
  }
};

exports.GetAllData = async (req, res) => {
  const data = await PowerHackUser.find({});

  return res.status(200).json({
    message: "All power hack Users!!",
    result: data,
  });
};

exports.deleteById = async (req, res) => {
  const data = await PowerHackUser.findById(req.params.id);
  const result = await data.remove();
  return res.status(200).json({
    message: "Deleted",
    result: result,
  });
};

exports.currentUserGet = async (req, res) => {
  console.log(req.user);
  const data = await PowerHackUser.findById(req.user.id);
  return res.status(200).json({
    message: "Get Current User!!",
    result: data,
  });
};
