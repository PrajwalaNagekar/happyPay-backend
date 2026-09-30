import express from "express";

import {
  loginRetailer,
  logoutRetailer,
  registerRetailer,
  getBankListController,
  kycReapply,
} from "../controllers/auth.controllers.js";
import { uploadRetailerDocuments } from "../../../utils/multer.js";
import { validateRegisterRetailer } from "../validations/retailer.validation.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";

const router = express.Router();


router.post(
  "/retailer/register",
  uploadRetailerDocuments,
  validateRegisterRetailer,
  registerRetailer
);

router.post(
  "/retailer/login",
  loginRetailer
);

router.post(
  "/retailer/logout",
  logoutRetailer
);

router.get(
  "/banks",
  getBankListController
);

router.post(
  "/retailer/kyc/reapply",
  authMiddleware,
  kycReapply
);

export default router;