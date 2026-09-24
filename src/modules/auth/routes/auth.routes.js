import express from "express";

import {
  loginRetailer,
  logoutRetailer,
  registerRetailer,
} from "../controllers/auth.controllers.js";
import { uploadRetailerDocuments } from "../../../utils/multer.js";

const router = express.Router();


router.post(
  "/retailer/register",
  uploadRetailerDocuments,
  registerRetailer
);

router.post(
  "/retailer/login",
  loginRetailer
);

router.post(
  "/retailer/logout",
  logoutRetailer
);


export default router;