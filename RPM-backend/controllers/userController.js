const ObjectId = require("mongodb").ObjectId;

const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const { response } = require("express");
const Otp = require("../models/otpModel");
const TotalUser = require("../models/totalUsersModel");
const Member = require("../models/memberModel");
const Attendance = require("../models/attendanceModel");

const currentUsers = async (req, res) => {
  const text = await User.find();
  res.send(text);
};

const totalUsers = async (req, res) => {
  const text = await TotalUser.find();
  res.send(text);
};

const getNewMemberCount = async (req, res) => {
  const userMontlyCount = [];
  try {
    for (let i = 1; i <= 12; i++) {
      const text = await Member.find({
        createdAt: {
          $gte: `2022-0${i}-01`,
          $lte: `2022-0${i}-31`,
        },
        academyName: req.params.loggedInAcademy,
      });

      // console.log(text);
      let count = 0;
      for (let i in text) {
        count++;
        // console.log(count);
      }
      userMontlyCount.push(count);
    }
  } catch (err) {
    console.log(err.message);
  }
  res.send(userMontlyCount);
};

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists. Please enter another email address");
    // return;
  }

  const user = await User.create({ name, email, password, picture });
  const totalUser = await TotalUser.create({ name, email, password, picture });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error creating user");
    // return;
  }

  res.json({
    name,
    email,
  });
});

const userAuthentication = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email, name });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    console.log("Invalid credentials");
    throw new Error(
      "Inavlid credentials. Please enter with registered credentials."
    );
  }
});

const emailSend = asyncHandler(async (req, res) => {
  let { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: email,
      otpCode: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpData.save();
    mailer(email, otpcode);
    res.json("Check your email for your one time password");
  } else {
    res.status(400);
    throw new Error(
      "Email does not exists. Please enter the registered email address"
    );
  }
});

const changePassword = asyncHandler(async (req, res) => {
  let { email, otpCode, password, OTP } = req.body;
  console.log(otpCode);
  let data = await Otp.findOne({ email, otpCode: OTP });
  console.log(data);
  if (data) {
    let user = await User.findOne({
      email: email,
    });
    user.password = password;
    user.save();
    res.json("Password changed successfully");
  } else {
    throw new Error(
      "OTP is invalid or has been expired. Please enter a valid OTP or request for a new one."
    );
  }
});

// const changePassword = asyncHandler(async (req, res) => {
//   let { email, otpCode, password } = req.body;
//   let data = await Otp.find({ email, otpCode });
//   if (data) {
//     let currentTime = new Date().getTime();
//     let timeDifference = data.expireIn - currentTime;
//     if (timeDifference < 0) {
//       throw new Error("OTP has been expired. Please request for a new one.");
//     } else {
//       let user = await User.findOne({
//         email: email,
//         code: otpCode,
//       });
//       user.password = password;
//       user.save();
//       res.json("Password changed successfully");
//     }
//   } else {
//     throw new Error("Invalid OTP. Please check your email and enter again.");
//   }
// });

const mailer = (email, otp) => {
  console.log(email, otp);
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 557,
    secure: false,
    auth: {
      user: "rpmotp@gmail.com",
      pass: "cbzuuuzymtryleml",
    },
  });

  var mailOptions = {
    from: "rpmotp@gmail.com",
    to: email,
    subject: "Password reset",
    text: `Here is your otp: ${otp} for password reset.`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent to ${email}`);
    }
  });
};

const createMember = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    beltColor,
    loggedInAcademy,
    isChecked,
  } = req.body;

  const memberExist = await Member.findOne({ email });
  // if (memberExist) {
  //   res.status(400);
  //   console.log("Member already exists");
  //   throw new Error("Member already exists");
  //   // return;
  // }

  const member = await Member.create({
    firstName,
    lastName,
    mobileNumber,
    email,
    beltColor,
    academyName: loggedInAcademy,
    isChecked,
  });
  if (member) {
    res.status(201).json({
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      mobileNumber: member.mobileNumber,
      email: member.email,
      beltColor: member.beltColor,
      academyName: member.academyName,
    });
  } else {
    res.status(400);
    throw new Error("Error creating new member");
    // return;
  }

  res.json({
    firstName,
    email,
  });
});

const getMemberDetails = asyncHandler(async (req, res) => {
  try {
    const academyName = req.params.loggedInAcademy;
    const memberList = await Member.find({ academyName });
    res.send(memberList);
  } catch (err) {
    console.log(err.response.data);
  }
});

const updateMemberDetails = asyncHandler(async (req, res) => {
  try {
    const _id = req.params.id;

    console.log(req.params);
    const userToBeUpdated = await Member.findByIdAndUpdate(_id, req.body);
    // console.log(deletedUser);
    res.json("Member details updated");
  } catch (e) {
    console.log(e.message);
  }
});

const deleteMember = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body.id);
    const id = req.params.id;
    const deletedUser = await Member.findByIdAndDelete(id);
    // console.log(deletedUser);
    res.json("Member deleted");
  } catch (e) {
    console.log(e.message);
  }
});

const getMemberReport = asyncHandler(async (req, res) => {
  try {
    const date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const memberMonthlyReport = await Member.find({
      createdAt: {
        $gte: firstDay,
        $lte: lastDay,
      },
      academyName: req.params.loggedInAcademy,
    });
    if (memberMonthlyReport) {
      res.send(memberMonthlyReport);
      console.log("Member report generated");
    } else {
      console.log("Member report generation failed");
    }
  } catch (e) {
    console.log(e.message);
  }
});

const memberAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  try {
    const { date, memberAttendance, academyName } = req.body;
    const checkAttendance = await Attendance.findOne({
      date,
      academyName,
    });
    if (checkAttendance) {
      // console.log("Attendance has been submitted for today.");
      throw new Error("Attendance can be submitted once a day. Thank you.");
    } else {
      const member = await Attendance.create({
        memberAttendance,
        date,
        academyName,
      });
      res.json("New Attendance has been submitted");
    }
  } catch (e) {
    console.log(e.response.data.message);
  }
});

const getMemberAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  try {
    console.log("....Before locale string....");
    const { date, loggedInAcademy } = req.params;
    console.log(date);
    console.log("backend", loggedInAcademy);
    const getAttendance = await Attendance.findOne({
      date: date,
      academyName: loggedInAcademy,
    });
    if (getAttendance) {
      console.log("Attendance fetched successfully", getAttendance);
      res.send(getAttendance);
    } else {
      console.log("Could not fetch attendance");
    }
  } catch (e) {
    console.log(e.respose.data.message);
  }
});

module.exports = {
  createUser,
  userAuthentication,
  emailSend,
  changePassword,
  currentUsers,
  totalUsers,
  getNewMemberCount,
  createMember,
  getMemberDetails,
  updateMemberDetails,
  deleteMember,
  memberAttendance,
  getMemberAttendance,
  getMemberReport,
};
