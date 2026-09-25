import env from "../../../config/env.js";
import ApiResponse from "../../../utils/ApiResponse.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt.js";
import { resolveUserAccess } from "../../../utils/rbac.js";
import { getBankList } from "../../external/services/demographic.client.js";

import {
  findRetailerByEmail,
  findRetailerByMobile,
  createTestRetailer,
  updateLastLogin,
  addRefreshToken,
  addOrUpdateDevice,
  findUserByRefreshToken,
  removeRefreshToken,
  deactivateDevice,
} from "../repository/auth.repository.js";

import {
  findLatestOtp,
  markOtpVerified,
  incrementAttempts,
} from "../repository/otp.repository.js";


/* ==============================
   Token Payloads
============================== */

const buildAccessTokenPayload = (user, access) => ({
  userId: user._id.toString(),
  email: user.email,
  userType: "retailer",
  roles: access.roles,
  permissions: access.permissions,
});

const buildRefreshTokenPayload = (user) => ({
  userId: user._id.toString(),
  userType: "retailer",
});


/* ==============================
   Calculate Refresh Token Expiry
============================== */

const getRefreshTokenExpiry = () => {
  const expiresIn =
    env.JWT_REFRESH_EXPIRES_IN || "30d";

  const match = expiresIn.match(
    /^(\d+)([smhd])$/
  );

  if (!match) {
    return new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    );
  }

  const value = Number(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(
    Date.now() + value * multipliers[unit]
  );
};


/* ==============================
   Retailer Login
============================== */

const retailerLogin = async ({
  mobile,
  otp,
  fcmToken,
  deviceId,
  platform,
  deviceName,
}) => {

  /* ==============================
     Validate Input
  ============================== */

  if (!mobile) {
    const error = new Error(
      "Mobile number is required"
    );

    error.statusCode = 400;

    throw error;
  }

  if (!otp) {
    const error = new Error(
      "OTP is required"
    );

    error.statusCode = 400;

    throw error;
  }

  if (!fcmToken) {
    const error = new Error(
      "FCM token is required"
    );

    error.statusCode = 400;

    throw error;
  }

  if (!deviceId) {
    const error = new Error(
      "Device ID is required"
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    !["android", "ios", "web"].includes(platform)
  ) {
    const error = new Error(
      "Invalid platform"
    );

    error.statusCode = 400;

    throw error;
  }


  /* ==============================
     Find Retailer By Mobile
  ============================== */

  let user = await findRetailerByMobile(mobile);

  if (!user) {
    const error = new Error(
      "Retailer not registered. Please register first."
    );

    error.statusCode = 404;

    throw error;
  }


  /* ==============================
     Verify OTP
  ============================== */

  // Static OTP verification for now
  const STATIC_OTP = "123456";

  if (otp.trim() !== STATIC_OTP) {
    const error = new Error(
      "Invalid OTP"
    );

    error.statusCode = 401;

    throw error;
  }


  /* ==============================
     Check Account Status
  ============================== */

  if (!user.isActive) {
    const error = new Error(
      "Retailer account is inactive"
    );

    error.statusCode = 403;

    throw error;
  }

  if (user.status === "blocked") {
    const error = new Error(
      "Retailer account is blocked"
    );

    error.statusCode = 403;

    throw error;
  }

  if (user.status === "suspended") {
    const error = new Error(
      "Retailer account is suspended"
    );

    error.statusCode = 403;

    throw error;
  }


  /* ==============================
     Check Admin KYC Approval
  ============================== */

  if (user.adminApproved !== "approved") {
    const error = new Error(
      user.adminApproved === "rejected"
        ? `Your KYC has been rejected. Reason: ${user.reasonOfRejection || "Not specified"}`
        : "Your KYC is pending admin approval"
    );

    error.statusCode = 403;

    throw error;
  }


  /* ==============================
     Generate Tokens
  ============================== */

  const access = resolveUserAccess(user);

  const accessToken = generateAccessToken(
    buildAccessTokenPayload(user, access)
  );

  const refreshToken = generateRefreshToken(
    buildRefreshTokenPayload(user)
  );


  /* ==============================
     Save Refresh Token
  ============================== */

  await addRefreshToken(
    user._id,
    {
      token: refreshToken,
      deviceId,
      expiresAt: getRefreshTokenExpiry(),
      lastUsedAt: new Date(),
    }
  );


  /* ==============================
     Save FCM Device
  ============================== */

  await addOrUpdateDevice(
    user._id,
    {
      deviceId,
      fcmToken,
      platform,
      deviceName,
    }
  );


  /* ==============================
     Update Last Login
  ============================== */

  await updateLastLogin(
    user._id
  );


  /* ==============================
     Response
  ============================== */

  return {
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      status: user.status,
      kycStatus: user.kycStatus,
      adminApproved: user.adminApproved,
      outletId: user.outletId,
      roles: access.roles,
      permissions: access.permissions,
    },

    accessToken,

    refreshToken,
  };
};


/* ==============================
   Retailer Logout
============================== */

const retailerLogout = async ({
  refreshToken,
  deviceId,
}) => {
  if (!refreshToken) {
    const error = new Error(
      "Refresh token is required"
    );

    error.statusCode = 400;

    throw error;
  }

  const user = await findUserByRefreshToken(
    refreshToken
  );

  if (!user) {
    return null;
  }

  const storedToken = user.refreshTokens.find(
    (item) => item.token === refreshToken
  );

  const logoutDeviceId =
    deviceId || storedToken?.deviceId;

  await removeRefreshToken({
    userId: user._id,
    refreshToken,
    deviceId: logoutDeviceId,
  });

  if (logoutDeviceId) {
    await deactivateDevice(
      user._id,
      logoutDeviceId
    );
  }

  return null;
};



export {
  retailerLogin,
  retailerLogout,
  
};