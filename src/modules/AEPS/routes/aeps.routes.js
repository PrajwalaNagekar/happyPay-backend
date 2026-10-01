import { Router } from "express";
import { getRetailerKycDetailsController } from "../controller/aeps.controller.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";

const router = Router();

// Get retailer KYC details (Aadhaar and PAN)
router.get("/retailer/:retailerId/kyc-details",authMiddleware, getRetailerKycDetailsController);

export default router;
