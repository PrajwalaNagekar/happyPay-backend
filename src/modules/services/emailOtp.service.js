import transporter from "../../config/mail.js"
;

import {
  findLatestOtp,
  deleteExistingOtps,
  createOtp,
  markOtpVerified,
} from "../repositories/emailOtp.repository.js";


const sendEmailOtp = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  email = email.trim().toLowerCase();

  // Static OTP for testing
  const otp = "123456";

  // OTP expires in 5 minutes
  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await deleteExistingOtps(email);

  await createOtp({
    email,
    otp,
    expiresAt,
  });

  await transporter.sendMail({
    from: `"HappyPay" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "HappyPay Email Verification OTP",

    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>HappyPay Email Verification</h2>

        <p>Your verification OTP is:</p>

        <h1 style="letter-spacing: 5px;">
          ${otp}
        </h1>

        <p>
          This OTP will expire in
          <strong>5 minutes</strong>.
        </p>

        <p>
          If you did not request this OTP,
          please ignore this email.
        </p>
      </div>
    `,
  });

  return {
    email,
    expiresAt,
  };
};


const verifyEmailOtp = async (email, otp) => {
  if (!email || !otp) {
    const error = new Error(
      "Email and OTP are required"
    );

    error.statusCode = 400;

    throw error;
  }

  email = email.trim().toLowerCase();
  otp = otp.trim();

  const otpRecord = await findLatestOtp(email);

  if (!otpRecord) {
    const error = new Error(
      "OTP not found or already verified"
    );

    error.statusCode = 400;

    throw error;
  }

  if (new Date() > otpRecord.expiresAt) {
    const error = new Error(
      "OTP has expired"
    );

    error.statusCode = 400;

    throw error;
  }

  if (otpRecord.otp !== otp) {
    const error = new Error(
      "Invalid OTP"
    );

    error.statusCode = 400;

    throw error;
  }

  const verifiedOtp =
    await markOtpVerified(otpRecord);

  return {
    email: verifiedOtp.email,
    verified: true,
    verifiedAt: verifiedOtp.verifiedAt,
  };
};


export {
  sendEmailOtp,
  verifyEmailOtp,
};