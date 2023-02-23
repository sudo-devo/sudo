const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash_pass });
        await user.save();
        res.send("User Registered");
      }
    });
  } catch (err) {
    res.send("Error in registration");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_pas = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pas, (err, result) => {
        if (result) {
          const token = jwt.sign({ user_Id: user[0]._id }, process.env.KEY);
          res.send({ msg: "Login Succesfully", token: token });
        } else {
          res.send("Please enter right credentials");
        }
      });
    }
  } catch (err) {
    res.send("Error in login");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
