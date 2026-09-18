import {
  sendEmailOtp,
  verifyEmailOtp,
} from "../services/emailOtp.service.js";

import { ApiResponse } from "../../utils/ApiResponse.js";


const sendOtp = async (req, res) => {
  try {
    const data = await sendEmailOtp(
      req.body.email
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "OTP sent successfully"
      )
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      success: false,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const data = await verifyEmailOtp(
      req.body.email,
      req.body.otp
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        data,
        "Email verified successfully"
      )
    );
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      statusCode: error.statusCode || 500,
      success: false,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};


export {
  sendOtp,
  verifyOtp,
};