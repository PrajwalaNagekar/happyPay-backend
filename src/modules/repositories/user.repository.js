import User from "../models/user.model.js";

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

export {
  findByMobile,
  createUser,
  verifyMobile,
};