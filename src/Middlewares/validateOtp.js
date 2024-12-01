const { temporaryUserModel } = require("../Models/User");

const validateOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const tempUser = await temporaryUserModel.findOne({ email, email });

    if (!tempUser) {
      return res.status(404).send({ message: "User not found in DB" });
    }

    if (tempUser.otp != otp) {
      throw new Error("otp is not valid");
    }

    if (tempUser.otpExpiration < new Date()) {
      throw new Error("otp expired");
    }

    req.validatingUser = tempUser;
    req.validatingUser.isEmailVerified = true;
    next();
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong ", error: err.message });
  }
};

module.exports = validateOtp;
