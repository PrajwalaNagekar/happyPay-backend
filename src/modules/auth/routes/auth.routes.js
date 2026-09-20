import express from "express";

import {
  loginRetailer,
  logoutRetailer,
} from "../controllers/auth.controllers.js";

const router = express.Router();


router.post(
  "/retailer/login",
  loginRetailer
);

router.post(
  "/retailer/logout",
  logoutRetailer
);


export default router;