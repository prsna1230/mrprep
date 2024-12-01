const express = require("express");
const connectDB = require("./database/connectDb");

// routes
const { userRouter } = require("./APIS/userapi");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT | 4321;

app.use(express.json());
app.use("/", userRouter);

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
