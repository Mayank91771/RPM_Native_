const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    beltColor: {
      type: String,
      required: true,
    },
    academyName: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
    },
    membershipStatus: {
      type: String,
      required: true,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
