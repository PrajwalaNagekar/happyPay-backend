import onboardMerchant from "../../external/services/onboardMerchant.client.js";
import { findVerifiedOtp } from "../repository/emailOtp.repository.js";
import {
  findByAadhaar,
  findByEmail,
  findByMobile,
  findByPan,
  saveRetailerRegistration,
} from "../repository/user.repository.js";

const fail = (statusCode, message, meta = null) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.meta = meta;
  return error;
};

const isBlank = (value) =>
  value === undefined ||
  value === null ||
  String(value).trim() === "";

const toDateOnly = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().slice(0, 10);
};

const buildRetailerResponse = (user) => ({
  id: user._id,
  mobile: user.mobile,
  isMobileVerified: user.isMobileVerified,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  fullName: user.fullName,
  gender: user.gender,
  panNumber: user.panNumber,
  aadhaarNumber: user.aadhaarNumber,
  dateOfBirth: user.dateOfBirth
    ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
    : null,
  fullAddress: user.shop?.address?.addressLine || null,
  city: user.shop?.address?.city || null,
  state: user.shop?.address?.state || null,
  pincode: user.shop?.address?.pincode || null,
  latitude: user.shop?.location?.latitude ?? null,
  longitude: user.shop?.location?.longitude ?? null,
  outletId: user.outletId || null,
  adminApproved: user.adminApproved,
  reasonOfRejection: user.reasonOfRejection || null,
});

const registerRetailer = async (body = {}) => {
  const mobile = isBlank(body.mobile) ? "" : String(body.mobile).trim();
  const name = isBlank(body.name) ? "" : String(body.name).trim();
  const gender = isBlank(body.gender) ? "" : String(body.gender).trim();
  const pan = isBlank(body.pan) ? "" : String(body.pan).trim().toUpperCase();
  const email = isBlank(body.email) ? "" : String(body.email).trim().toLowerCase();
  const aadhaar = isBlank(body.aadhaar) ? "" : String(body.aadhaar).trim();
  const fulladdress = isBlank(body.fulladdress)
    ? ""
    : String(body.fulladdress).trim();
  const pincode = isBlank(body.pincode) ? "" : String(body.pincode).trim();
  const city = isBlank(body.city) ? "" : String(body.city).trim();
  const dob = isBlank(body.dob) ? "" : String(body.dob).trim();
  const latitude = body.latitude;
  const longitude = body.longitude;

  const required = {
    mobile,
    name,
    gender,
    pan,
    email,
    aadhaar,
    fulladdress,
    pincode,
    city,
    dob,
    latitude,
    longitude,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => isBlank(value))
    .map(([key]) => key);

  if (missing.length) {
    throw fail(400, `Missing required fields: ${missing.join(", ")}`);
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    throw fail(400, "Please enter a valid 10-digit mobile number");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw fail(400, "Please enter a valid email address");
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) {
    throw fail(400, "Please enter a valid PAN number");
  }

  if (!/^\d{12}$/.test(aadhaar)) {
    throw fail(400, "Please enter a valid 12-digit Aadhaar number");
  }

  if (!/^\d{6}$/.test(pincode)) {
    throw fail(400, "Please enter a valid 6-digit pincode");
  }

  const parsedDob = toDateOnly(dob);
  if (!parsedDob) {
    throw fail(400, "Please enter a valid date of birth");
  }

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);

  if (
    Number.isNaN(parsedLatitude) ||
    parsedLatitude < -90 ||
    parsedLatitude > 90
  ) {
    throw fail(400, "Please enter a valid latitude");
  }

  if (
    Number.isNaN(parsedLongitude) ||
    parsedLongitude < -180 ||
    parsedLongitude > 180
  ) {
    throw fail(400, "Please enter a valid longitude");
  }

  const user = await findByMobile(mobile);

  if (!user || !user.isMobileVerified) {
    throw fail(
      400,
      "Mobile number is not verified. Verify the mobile OTP before registration"
    );
  }

  const emailMatchesUser =
    user.isEmailVerified && user.email === email;
  const verifiedEmailOtp = emailMatchesUser
    ? null
    : await findVerifiedOtp(email);

  if (!emailMatchesUser && !verifiedEmailOtp) {
    throw fail(
      400,
      "Email is not verified. Verify the email OTP before registration"
    );
  }

  if (user.outletId) {
    throw fail(409, "Retailer is already registered");
  }

  const [emailOwner, panOwner, aadhaarOwner] = await Promise.all([
    findByEmail(email),
    findByPan(pan),
    findByAadhaar(aadhaar),
  ]);

  if (
    emailOwner &&
    emailOwner._id.toString() !== user._id.toString()
  ) {
    throw fail(409, "Email is already registered");
  }

  if (
    panOwner &&
    panOwner._id.toString() !== user._id.toString()
  ) {
    throw fail(409, "PAN is already registered");
  }

  if (
    aadhaarOwner &&
    aadhaarOwner._id.toString() !== user._id.toString()
  ) {
    throw fail(409, "Aadhaar is already registered");
  }

  let providerResult;

  try {
    providerResult = await onboardMerchant({
      mobile,
      name,
      gender,
      pan,
      email,
      aadhaar,
      fulladdress,
      pincode,
      city,
      dob: parsedDob,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    });
  } catch (error) {
    const providerStatus = error.response?.status;
    const providerData = error.response?.data;
    const providerMessage =
      providerData?.msg ||
      providerData?.message ||
      error.message ||
      "Merchant onboarding failed";

    throw fail(
      providerStatus && providerStatus >= 400 && providerStatus < 500
        ? providerStatus
        : 502,
      providerMessage,
      providerData || null
    );
  }

  const providerStatus = String(providerResult?.status || "").toUpperCase();
  const providerData = providerResult?.data || {};
  const outletId = providerData.outletId;

  if (providerStatus !== "SUCCESS" || isBlank(outletId)) {
    throw fail(
      400,
      providerResult?.msg || "Merchant onboarding failed",
      providerResult || null
    );
  }

  const savedUser = await saveRetailerRegistration(user._id, {
    fullName: providerData.name || name,
    gender: providerData.gender || gender,
    panNumber: pan,
    email,
    isEmailVerified: true,
    aadhaarNumber: aadhaar,
    dateOfBirth: new Date(providerData.dateOfBirth || parsedDob),
    "shop.address.addressLine": providerData.address || fulladdress,
    "shop.address.city": providerData.city || city,
    "shop.address.state": providerData.state || null,
    "shop.address.pincode": providerData.pincode
      ? String(providerData.pincode)
      : pincode,
    "shop.location.latitude": parsedLatitude,
    "shop.location.longitude": parsedLongitude,
    outletId: String(outletId),
    adminApproved: "pending",
    reasonOfRejection: null,
  });

  return buildRetailerResponse(savedUser);
};

export { registerRetailer };
