const bcrypt = require("bcrypt");
const express = require("express");
const connectDB = require("./database/connectDb");
const { temporaryUserModel, UserModel } = require("./Models/User");

const {
  userRegistrationApi,
  validateOtpApi,
} = require("./constants/API_ENDPOINTS");
const { emailVerification } = require("./Utils/sendEmail");
const { generateOtp } = require("./Middlewares/generateOtp");
const validateOtp = require("./Middlewares/validateOtp");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 4321;

app.use(express.json());

// temporary user registration
app.post(userRegistrationApi, generateOtp, async (req, res) => {
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
app.post(validateOtpApi, validateOtp, async (req, res) => {
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

    res
      .status(201)
      .send({ message: "OTP verified and user registered successfully" });
  } catch (err) {
    res.status(401).send({
      message: "user registration failed",
      error: err.message,
    });
  }
});

connectDB()
  .then(() => {
    console.log("DB connection success");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
