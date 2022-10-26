const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otpCode: {
      type: String,
      required: true,
    },
    expireIn: {
      type: Date,
      default: Date.now,
      expires: 60,
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema, "otp");

module.exports = Otp;
