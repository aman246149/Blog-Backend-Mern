const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

router.post("/register", async (req, res, next) => {
  //lets validate the data before saving to db

  const { error } = registerValidation(req.body);

  if (error) {
    const errmsg = error.details[0].message;
    return res.status(400).send(errmsg);
  }

  //   checking if the user is already in the database
  const emailExist = await User.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send({message:"Email already exist"});
    console.log(emailExist)

  //hash the passwords
  const salt = await bcrypt.genSalt(13);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //   creating a new user
  const user = new User({
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send({message:err});
  }
});

//login route
router.post("/login", async (req, res, next) => {
  //lets validate the data before saving to db

  const { error } = registerValidation(req.body);

  if (error) {
    const errmsg = error.details[0].message;
    return res.status(400).send(errmsg);
  }

  //   checking if the user is already in the database
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user)
    return res.status(400).send("Email or password doesn't exist");

    //password is correct
    const validPass=await bcrypt.compare(req.body.password,user.password);

    if(!validPass)return res.status(400).send("Invalid password");

    //create and assign a token

    const token=await jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    await res.header("auth-token",token).send({token:token,user:user.email})

});

module.exports = router;
