import User from "../model/user.model.js";

const findByMobile = async (mobile) => {
  return await User.findOne({ mobile });
};

const createUser = async (mobile) => {
  return await User.create({
    mobile,
    isMobileVerified: true,
  });
};

const verifyMobile = async (userId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      isMobileVerified: true,
    },
    {
      new: true,
    }
  );
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByPan = async (panNumber) => {
  return await User.findOne({ panNumber });
};

const findByAadhaar = async (aadhaarNumber) => {
  return await User.findOne({ aadhaarNumber });
};

const setEmailVerified = async (userId, email) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      email,
      isEmailVerified: true,
    },
    {
      new: true,
    }
  );
};

const markEmailVerifiedByEmail = async (email) => {
  return await User.updateMany(
    { email },
    { isEmailVerified: true }
  );
};

const saveRetailerRegistration = async (userId, payload) => {
  return await User.findByIdAndUpdate(
    userId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).select("-refreshTokens -devices");
};

export {
  findByMobile,
  createUser,
  verifyMobile,
  findByEmail,
  findByPan,
  findByAadhaar,
  setEmailVerified,
  markEmailVerifiedByEmail,
  saveRetailerRegistration,
};