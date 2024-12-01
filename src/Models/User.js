const mongoose = require("mongoose");
const validator = require("validator");
const { AllowedExams } = require("../constants/exams");

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      maxLength: 15,
      minLength: 4,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minlength: 8,
            maxlength: 12,
            minUppercase: 1,
            minNumbers: 1,
          })
        ) {
          throw new Error("Password is not strong");
        }
      },
    },
    preparingFor: {
      type: Array,
      required: true,
      validate(enteredExams) {
        let isAllowedExam = enteredExams.every((exam) => {
          return AllowedExams.includes(exam.toUpperCase());
        });
        if (!isAllowedExam) {
          throw new Error("entered exam is not allowed");
        }
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiration: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);
const temporaryUserModel = mongoose.model("temporaryUser", UserSchema);

module.exports = {
  UserModel,
  temporaryUserModel,
};
