import { Router } from 'express';
const router = Router();

import emailOtpRoutes from "../modules/auth/routes/emailOtp.routes.js";
import masterDataRoutes from "../modules/masterdata/routes/masterData.routes.js";
import otpRoutes from "../modules/auth/routes/otp.routes.js";
import demographicRoutes from "../modules/external/routes/demographic.routes.js";
import authRoutes from "../modules/auth/routes/auth.routes.js";
import adminRoutes from "../modules/admin/routes/admin.routes.js";
import bannerRoutes from "../modules/banner/routes/banner.routes.js";

router.use("/api/v1/otp", otpRoutes);
router.use("/api/v1/email-otp", emailOtpRoutes);
router.use("/api/v1/master-data", masterDataRoutes);
router.use("/api/v1/provider/demographic",demographicRoutes);
router.use("/api/v1/auth", authRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/v1/banners", bannerRoutes);

export default router;
