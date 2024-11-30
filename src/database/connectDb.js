const mongoose = require("mongoose");
require("dotenv").config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const connectDb = async () => {
  await mongoose.connect(DB_CONNECTION_STRING);
};

module.exports = connectDb;
