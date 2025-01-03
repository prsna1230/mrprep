const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const { sessionToken } = req.cookies;
    if (!sessionToken) {
      throw new Error("User is not authenticated");
    }

    const decodedTokenObj = await jwt.verify(
      sessionToken,
      process.env.SECRET_KEY
    );

    const userId = decodedTokenObj._id;
    if (!userId) {
      throw new Error("unauthorized access");
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User is not found");
    }

    req.user = user;
  } catch (err) {
    res
      .status(404)
      .send({ message: "User is not authenticated ", error: err.message });
  }
};

module.exports = userAuth;
