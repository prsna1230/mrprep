const nodemailer = require("nodemailer");

const emailVerification = async (userEmailId, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prasanna12092024@gmail.com",
      pass: "nadq edvu owvy qxnw",
    },
  });

  const otpInfo = await transporter.sendMail({
    from: '"MrPrep" prasanna12092024@gmail.com',
    to: userEmailId,
    subject: "Your OTP for Mr Prep",
    html: `
        <div>
            <p>Dear Prep</p>
            <h5>Please enter this OTP ${otp} to register your account</h5>
            <br />

            <h6>Best Regards</h6>
        </div>
    
    `,
  });
};

module.exports = { emailVerification };
