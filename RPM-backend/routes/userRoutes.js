const express = require("express");
const {
  createUser,
  userAuthentication,
  emailSend,
  changePassword,
  currentUsers,
  totalUsers,
  getNewMemberCount,
  createMember,
  getMemberDetails,
  deleteMember,
  updateMemberDetails,
  memberAttendance,
  getMemberAttendance,
  getMemberReport,
} = require("../controllers/userController");

const router = express.Router();

router.post("/create", createUser);
router.post("/login", userAuthentication);
router.post("/email-send", emailSend);
router.put("/change-password", changePassword);
router.get("/current-users", currentUsers);
router.get("/total-users", totalUsers);
router.get("/new-member/:loggedInAcademy", getNewMemberCount);
router.post("/create-member", createMember);
router.get("/get-member-details/:loggedInAcademy", getMemberDetails);
router.post("/update-member-details/:id", updateMemberDetails);
router.delete("/delete-member/:id", deleteMember);
router.post("/member-attendance", memberAttendance);
router.get(
  "/get-member-attendance/:date/:loggedInAcademy",
  getMemberAttendance
);
router.get("/get-member-report/:loggedInAcademy", getMemberReport);
module.exports = router;
