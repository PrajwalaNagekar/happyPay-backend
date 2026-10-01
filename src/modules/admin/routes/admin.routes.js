import { Router } from "express";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import requireAdmin from "../../../middlewares/admin.middleware.js";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  list,
  detail,
  updateKyc,
  getAuditLogs,
} from "../controllers/admin.controller.js";

const router = Router();

// Auth routes (unprotected or self-protected)
router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

// Retailer routes (protected)
router.get("/retailers", authMiddleware, requireAdmin, list);
router.get("/retailers/:id", authMiddleware, requireAdmin, detail);
router.put("/retailers/:id/kyc", authMiddleware, requireAdmin, updateKyc);

// Audit logs routes (protected)
router.get("/audit-logs", authMiddleware, requireAdmin, getAuditLogs);

export default router;
