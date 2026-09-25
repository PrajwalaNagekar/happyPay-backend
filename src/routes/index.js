import { Router } from 'express';
const router = Router();

import emailOtpRoutes from "../modules/auth/routes/emailOtp.routes.js";
import masterDataRoutes from "../modules/masterdata/routes/masterData.routes.js";
import otpRoutes from "../modules/auth/routes/otp.routes.js";
import demographicRoutes from "../modules/external/routes/demographic.routes.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import adminAuthRoutes from "../modules/auth/routes/admin.routes.js";
import supportRoutes from "../modules/support/routes/support.route.js";
import adminSupportRoutes from "../modules/support/routes/support.route.js";
import aepsRoutes from "../modules/AEPS/routes/aeps.routes.js";

router.use("/api/v1/otp", otpRoutes);
router.use("/api/v1/email-otp", emailOtpRoutes);
router.use("/api/v1/master-data", masterDataRoutes);
router.use("/api/v1/provider/demographic",demographicRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/auth/admin", adminAuthRoutes);
router.use("/api/v1/support", supportRoutes);
router.use("/api/v1/aeps", aepsRoutes);
// router.use("/api/v1/admin/support", adminSupportRoutes);


export default router;
