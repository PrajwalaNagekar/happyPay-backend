import Admin from "../model/Admin.model.js";

const findByEmail = async (email) => {
  return await Admin.findOne({
    email: email.toLowerCase().trim(),
  }).select("+password");
};

const createAdmin = async (data) => {
  return await Admin.create(data);
};

const findById = async (id) => {
  return await Admin.findById(id);
};

export {
  findByEmail,
  createAdmin,
  findById,
};