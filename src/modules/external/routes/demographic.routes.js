import express from "express";

import {
  getBankListController,
  verifyAadharController,
  verifyAccountController,
  verifyPanController,
} from "../controller/demographic.controller.js";
import { onboardMerchantController } from "../controller/onboardMerchant.controler.js";

const router = express.Router();

router.post(
  "/verify-aadhaar",
  verifyAadharController
);
router.post("/verify-pan", verifyPanController);
router.post("/verify-account", verifyAccountController);
router.get("/get-bank-list", getBankListController);
router.post("/onboard-merchant", onboardMerchantController);

export default router;