const express = require("express");
const {
  homePage,
  register,
  verifyPage,
  verifyCode,
  getAllAttendees
} = require("../controllers/attendeeController.js");

const router = express.Router();

router.get("/", homePage);
router.post("/register", register);
router.get("/verify", verifyPage);
router.post("/verify", verifyCode);
router.get("/all", getAllAttendees);

module.exports = router;