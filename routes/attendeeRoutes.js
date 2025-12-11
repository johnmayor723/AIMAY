import express from "express";
import { homePage, register, verifyPage, verifyCode, getAllAttendees } from "../controllers/attendeeController.js";

const router = express.Router();

router.get("/", homePage);
router.post("/register", register);
router.get("/verify", verifyPage);
router.post("/verify", verifyCode);
router.get("/all", getAllAttendees )

export default router;
