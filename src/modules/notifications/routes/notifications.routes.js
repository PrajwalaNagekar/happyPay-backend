import { Router } from "express";

import {
  sendKycApprovedNotificationController,
  sendKycRejectedNotificationController,
} from "../controller/notifications.controller.js";

import { verifyToken } from "../../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/kyc-approved",
  verifyToken,
  sendKycApprovedNotificationController
);
router.post(
    "/kyc-rejected",
    verifyToken,
    sendKycRejectedNotificationController
  );
export default router;