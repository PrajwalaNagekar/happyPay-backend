import EmailOtp from "../models/EmailOtp.model.js";


const findLatestOtp = async (email) => {
  return await EmailOtp.findOne({
    email,
    isVerified: false,
  }).sort({
    createdAt: -1,
  });
};


const deleteExistingOtps = async (email) => {
  return await EmailOtp.deleteMany({
    email,
    isVerified: false,
  });
};


const createOtp = async (data) => {
  return await EmailOtp.create(data);
};


const markOtpVerified = async (otpRecord) => {
  otpRecord.isVerified = true;
  otpRecord.verifiedAt = new Date();

  return await otpRecord.save();
};


export {
  findLatestOtp,
  deleteExistingOtps,
  createOtp,
  markOtpVerified,
};