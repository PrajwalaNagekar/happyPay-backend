import { Router } from 'express';
const router = Router();

import emailOtpRoutes from "../modules/auth/routes/emailOtp.routes.js";
import masterDataRoutes from "../modules/masterdata/routes/masterData.routes.js";
import otpRoutes from "../modules/auth/routes/otp.routes.js";
import demographicRoutes from "../modules/external/routes/demographic.routes.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import adminAuthRoutes from "../modules/admin/routes/adminAuth.routes.js";
import adminAuditRoutes from "../modules/admin/routes/adminAudit.routes.js";
import adminRetailerRoutes from "../modules/admin/routes/adminRetailer.routes.js";

router.use("/api/v1/otp", otpRoutes);
router.use("/api/v1/email-otp", emailOtpRoutes);
router.use("/api/v1/master-data", masterDataRoutes);
router.use("/api/v1/provider/demographic",demographicRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/admin/auth", adminAuthRoutes);
router.use("/api/admin/audit-logs", adminAuditRoutes);
router.use("/api/admin/retailers", adminRetailerRoutes);
export default router;
