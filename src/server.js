const express = require("express");
const connectDB = require("./database/connectDb");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT | 4321;

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
