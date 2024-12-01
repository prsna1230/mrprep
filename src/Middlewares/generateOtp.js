const generateOtp = (req, res, next) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  req.body.otp = otp;

  const now = new Date();
  now.setMinutes(now.getMinutes() + 1);

  req.body.otpExpiration = now;
  next();
};

module.exports = { generateOtp };
