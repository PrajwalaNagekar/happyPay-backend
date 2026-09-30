import { Router } from "express";
import {
  createBannerController,
  getBannersController,
  getBannerByIdController,
  updateBannerController,
  deleteBannerController,
} from "../controllers/banner.controller.js";
// import { verifyToken, isAdmin } from "../../../middlewares/auth.js"; // Assume these middlewares exist for protecting routes

const router = Router();

// Public / Retailer route to get active banners
router.get("/", getBannersController);
router.get("/:id", getBannerByIdController);

// Admin only routes for CRUD
// If you have auth middlewares, add them here: router.post("/", verifyToken, isAdmin, createBannerController);
router.post("/", createBannerController);
router.put("/:id", updateBannerController);
router.delete("/:id", deleteBannerController);

export default router;
