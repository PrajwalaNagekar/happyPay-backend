import express from "express";

import {
  verifyAadharController,
} from "../controller/demographic.controller.js";

const router = express.Router();

router.post(
  "/verify-aadhaar",
  verifyAadharController
);

export default router;