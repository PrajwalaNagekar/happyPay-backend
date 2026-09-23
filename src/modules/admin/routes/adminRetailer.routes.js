import express from "express";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import requireAdmin from "../../../middlewares/admin.middleware.js";
import { detail, list } from "../controllers/adminRetailer.controller.js";

const router = express.Router();
router.use(authMiddleware, requireAdmin);
router.get("/", list);
router.get("/:id", detail);

export default router;
