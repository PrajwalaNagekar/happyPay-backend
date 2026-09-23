import Admin from "../model/Admin.model.js";

const findByEmail = async (email) => {
  return await Admin.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");
};

const findAdminForLogin = async ({ email, mobile }) => {
  if (email?.trim()) {
    return await Admin.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");
  }

  if (mobile?.trim()) {
    return await Admin.findOne({
      mobile: mobile.trim(),
    }).select("+password");
  }

  return null;
};

const createAdmin = async (data) => {
  return await Admin.create(data);
};

const findById = async (id) => {
  return await Admin.findById(id);
};

const findOne = async (query) => {
  return await Admin.findOne(query);
};
export {
  findByEmail,
  findAdminForLogin,
  createAdmin,
  findById,
  findOne,
};