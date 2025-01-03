const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectDb");

// routes
const { userRouter } = require("./APIS/userapi");
const { categoryRouter } = require("./APIS/categoryapi");
const { topicRouter } = require("./APIS/topicsapi");

require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT | 4321;

app.use(express.json());
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", topicRouter);

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
