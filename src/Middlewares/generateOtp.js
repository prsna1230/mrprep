const generateOtp = (req, res, next) => {
  const otp = Math.floor(Math.random() * 10000);
  req.body.otp = otp;
  next();
};

module.exports = { generateOtp };
