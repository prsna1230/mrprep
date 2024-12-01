const bcrypt = require("bcrypt");
const express = require("express");
const connectDB = require("./database/connectDb");
const UserModel = require("./Models/User");

const { userRegistrationApi } = require("./constants/API_ENDPOINTS");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 4321;

app.use(express.json());

// user registration API
app.post(userRegistrationApi, async (req, res) => {
  try {
    const user = new UserModel(req.body);

    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;

    // before registration we need to validate whether the email id valid one. [TODO: mrprep-3002]
    await user
      .save()
      .then(() => {
        res.send("registration successfull");
      })
      .catch((err) => {
        res.send({ message: "Registration failed", error: err.message });
      });
  } catch (err) {
    res.send({
      message: "Registration Failed, Something went wrong",
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
