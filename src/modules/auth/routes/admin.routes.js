import express from "express";
import {
  loginAdmin,
  getPendingRetailers,
  approveRetailer,
  rejectRetailer,
} from "../controllers/admin.controller.js";
import authMiddleware, { requireAdmin } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get(
  "/retailers/pending",
  authMiddleware,
  requireAdmin,
  getPendingRetailers
);

router.patch(
  "/retailers/:retailerId/approve",
  authMiddleware,
  requireAdmin,
  approveRetailer
);

router.patch(
  "/retailers/:retailerId/reject",
  authMiddleware,
  requireAdmin,
  rejectRetailer
);

export default router;