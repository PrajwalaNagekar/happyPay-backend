import env from "../../../config/env.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../utils/jwt.js";
import { resolveUserAccess } from "../../../utils/rbac.js";

import {
  findRetailerByEmail,
  createTestRetailer,
  updateLastLogin,
  addRefreshToken,
  addOrUpdateDevice,
  findUserByRefreshToken,
  removeRefreshToken,
  deactivateDevice,
  updateKycStatusToPending,
  createRetailer,
  findRetailerByMobile,
} from "../repository/auth.repository.js";


/* ==============================
   Hardcoded Login Credentials
============================== */

const LOGIN_EMAIL = "retailer@gmail.com";
const LOGIN_OTP = "123456";


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
  email,
  otp,
  fcmToken,
  deviceId,
  platform,
  deviceName,
}) => {

  /* ==============================
     Validate Input
  ============================== */

  if (!email) {
    const error = new Error(
      "Email is required"
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
     Check Hardcoded Credentials
  ============================== */

  if (
    email.toLowerCase().trim() !==
    LOGIN_EMAIL
  ) {
    const error = new Error(
      "Invalid email or OTP"
    );

    error.statusCode = 401;

    throw error;
  }

  if (otp.trim() !== LOGIN_OTP) {
    const error = new Error(
      "Invalid email or OTP"
    );

    error.statusCode = 401;

    throw error;
  }


  /* ==============================
     Find Retailer
  ============================== */

  let user = await findRetailerByEmail(
    LOGIN_EMAIL
  );


  /* ==============================
     Create Test Retailer
  ============================== */

  if (!user) {
    user = await createTestRetailer(
      LOGIN_EMAIL
    );
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
      status: user.status,
      kycStatus: user.kycStatus,
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


/* ==============================
   Reapply For KYC
============================== */

const reapplyForKyc = async (userId) => {
  const updatedUser = await updateKycStatusToPending(userId);
  if (!updatedUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    kycStatus: updatedUser.kycStatus,
    kycRejectionReason: updatedUser.kycRejectionReason,
  };
};

const retailerRegister = async (data) => {
  const {
    mobile,
    email,
    fcmToken,
    deviceId,
    platform,
    deviceName,
  } = data;

  if (!mobile) {
    const error = new Error("Mobile number is required");
    error.statusCode = 400;
    throw error;
  }

  let user = await findRetailerByMobile(mobile);
  if (user) {
    const error = new Error("Retailer with this mobile already exists");
    error.statusCode = 409;
    throw error;
  }

  if (email) {
    const existingEmail = await findRetailerByEmail(email);
    if (existingEmail) {
      const error = new Error("Retailer with this email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  // Create new user with all the data
  user = await createRetailer(data);

  const access = resolveUserAccess(user);
  const accessToken = generateAccessToken(buildAccessTokenPayload(user, access));
  const refreshToken = generateRefreshToken(buildRefreshTokenPayload(user));

  await addRefreshToken(user._id, {
    token: refreshToken,
    deviceId: deviceId || "unknown",
    expiresAt: getRefreshTokenExpiry(),
    lastUsedAt: new Date(),
  });

  if (deviceId && fcmToken && platform) {
    await addOrUpdateDevice(user._id, {
      deviceId,
      fcmToken,
      platform,
      deviceName,
    });
  }

  await updateLastLogin(user._id);

  return {
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      status: user.status,
      kycStatus: user.kycStatus,
      roles: access.roles,
      permissions: access.permissions,
    },
    accessToken,
    refreshToken,
  };
};

export {
  retailerLogin,
  retailerLogout,
  reapplyForKyc,
  retailerRegister,
};