import express from "express";

import {
  getBankListController,
  verifyAadharController,
  verifyAccountController,
  verifyPanController,
} from "../controller/demographic.controller.js";

const router = express.Router();

router.post(
  "/verify-aadhaar",
  verifyAadharController
);
router.post("/verify-pan", verifyPanController);
router.post("/verify-account", verifyAccountController);
router.get("/get-bank-list", getBankListController);

export default router;