const express = require("express");
const { UserModel } = require("../model/userModal");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({ email, password: hash, confirmPassword });
      await user.save();
      res.status(200).send("New user has been registered");
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorID: user._id, author: user.name },
            "employee"
          );
          console.log(token);
          res.status(200).send({ msg: "login Successful", token: token });
        } else {
          res.status(200).send({ msg: "wrong Credentials" });
        }
      });
    } else {
      res.status(200).send({ msg: "wrong Credentials" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports={userRouter}
