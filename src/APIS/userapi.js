const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const { temporaryUserModel, UserModel } = require("../Models/User");
const {
  userRegistrationApi,
  validateOtpApi,
  userLoginApi,
  userLogoutApi,
} = require("../constants/API_ENDPOINTS");
const { emailVerification } = require("../Utils/sendEmail");
const { generateOtp } = require("../Middlewares/generateOtp");
const validateOtp = require("../Middlewares/validateOtp");

const userRouter = express.Router();
require("dotenv").config();

// storing user data in temp table
userRouter.post(userRegistrationApi, generateOtp, async (req, res) => {
  try {
    const newUser = new temporaryUserModel(req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    newUser.password = hashedPassword;

    const addedUser = await newUser.save();

    await emailVerification(addedUser.email, addedUser.otp);
    res.send({ message: "OTP send to mail id" });
  } catch (err) {
    res.status(500).send({
      message: "Registration failed",
      error: err.message,
    });
  }
});

// validate otp
userRouter.post(validateOtpApi, validateOtp, async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      preparingFor,
      isEmailVerified,
      otp,
      otpExpiration,
    } = req.validatingUser;

    const validUser = new UserModel({
      userName,
      email,
      password,
      preparingFor,
      isEmailVerified,
      otp,
      otpExpiration,
    });
    const user = await validUser.save();

    res.status(201).send({
      status: "OK",
      message: "OTP verified and user registered successfully",
    });
  } catch (err) {
    res.status(401).send({
      status: "Failed",
      message: "user registration failed",
      error: err.message,
    });
  }
});

// login
userRouter.post(userLoginApi, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Email Id is not valid");
    }

    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("User is not found in DB");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      //create JWT Token
      const token = await jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("sessiontoken", token);

      res
        .status(200)
        .send({ status: "OK", message: "user loggedIn successfully" });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
});

// logout api
userRouter.post(userLogoutApi, async (req, res) => {
  res.cookie("sessiontoken", null, {
    expires: new Date(Date.now()),
  });

  res
    .status(200)
    .send({ status: "OK", message: "User logged out successfully" });
});

module.exports = { userRouter };
