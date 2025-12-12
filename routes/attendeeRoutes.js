const express = require("express");
const {
  homePage,
  register,
  verifyPage,
  verifyCode,
  attendeesPage
} = require("../controllers/attendeeController.js");

const router = express.Router();

router.get("/", homePage);
router.post("/register", register);
router.get("/verify", verifyPage);
router.post("/verify", verifyCode);
router.get("/all", attendeesPage);

module.exports = router;