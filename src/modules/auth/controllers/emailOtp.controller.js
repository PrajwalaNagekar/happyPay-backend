import { asyncHandler } from '../../../utils/asyncHandler.js';
import {
  sendEmailOtp,
  verifyEmailOtp,
} from "../services/emailOtp.service.js";

import { ApiResponse } from "../../../utils/ApiResponse.js";

export const sendOtp = asyncHandler(async (req, res) => {
  const data = await sendEmailOtp(req.body.email);

    return res.status(200).json(
      ApiResponse.success(
        data,
        "OTP sent successfully"
      )
    );
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const data = await verifyEmailOtp(
      req.body.email,
      req.body.otp,
      req.body.mobile
    );

    return res.status(200).json(
      ApiResponse.success(
        data,
        "Email verified successfully"
      )
    );
});

