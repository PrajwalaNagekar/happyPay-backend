import express from "express";

import {
  loginRetailer,
  logoutRetailer,
  kycReapply,
  registerRetailer,
} from "../controllers/auth.controllers.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";

const router = express.Router();


router.post(
  "/retailer/register",
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

router.post(
  "/retailer/kyc/reapply",
  authMiddleware,
  kycReapply
);

export default router;