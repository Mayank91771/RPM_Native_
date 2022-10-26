const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    memberAttendance: [{}],
    academyName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
