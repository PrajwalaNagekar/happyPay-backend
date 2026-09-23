import express from "express";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import requireAdmin from "../../../middlewares/admin.middleware.js";
import getAuditLogs from "../controllers/adminAudit.controller.js";

const router = express.Router();

router.get("/", authMiddleware, requireAdmin, getAuditLogs);

export default router;
