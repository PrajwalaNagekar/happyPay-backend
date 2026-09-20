import express from "express";

import {
  verifyAccountController,
} from "../controller/demographic.controller.js";

const router = express.Router();

router.post(
  "/account-verify",
  verifyAccountController
);

export default router;