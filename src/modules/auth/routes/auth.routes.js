import express from "express";

import {
  sendRetailerLoginOtp,
  verifyRetailerLoginOtp,
  logoutRetailer,
  registerRetailer,
} from "../controllers/auth.controllers.js";
import { uploadRetailerDocuments } from "../../../utils/multer.js";
import { getBankListController } from "../controllers/auth.controllers.js";
import { validateRegisterRetailer } from "../validations/retailer.validation.js";

const router = express.Router();


router.post(
  "/retailer/register",
  uploadRetailerDocuments,
  validateRegisterRetailer,
  registerRetailer
);

router.post(
  "/retailer/login/send-otp",
  sendRetailerLoginOtp
);

router.post(
  "/retailer/login/verify-otp",
  verifyRetailerLoginOtp
);

router.post(
  "/retailer/logout",
  logoutRetailer
);

router.get(
  "/banks",
  
  getBankListController
);

export default router;