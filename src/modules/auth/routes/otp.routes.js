import { Router } from "express";
import {
  sendOtp,
  verifyOtp,
} from "../controllers/otp.controllers.js";

const router = Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);

export default router;