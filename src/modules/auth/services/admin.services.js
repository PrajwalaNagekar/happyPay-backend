import bcrypt from "bcrypt";
import Role from "../model/role.model.js";

import { generateAccessToken } from "../../../utils/jwt.js";

import {
  findByEmail,
  findAdminForLogin,
  createAdmin,
} from "../repository/admin.repository.js";

const createAdminService = async ({
    firstName,
    lastName,
    email,
    mobile,
    password,
    roleSlug,
  }) => {
    const normalizedEmail = email.toLowerCase().trim();
  
    const existingAdmin = await findByEmail(normalizedEmail);
  
    if (existingAdmin) {
      throw new Error("Admin already exists");
    }
  
    const role = await Role.findOne({
      slug: roleSlug,
      isActive: true,
    });
  
    if (!role) {
      throw new Error(`Admin role '${roleSlug}' not found`);
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
  
    const admin = await createAdmin({
      firstName: firstName.trim(),
      lastName: lastName?.trim(),
      email: normalizedEmail,
      mobile,
      password: hashedPassword,
      roles: [role._id],
      status: "active",
    });
  
    return admin;
  };
  

const loginAdminService = async ({
  email,
  mobile,
  password,
}) => {
  if ((!email?.trim() && !mobile?.trim()) || !password) {
    const error = new Error("Email or mobile and password are required");
    error.statusCode = 400;
    throw error;
  }

  if (email?.trim() && mobile?.trim()) {
    const error = new Error("Enter either email or mobile, not both");
    error.statusCode = 400;
    throw error;
  }

  const admin = await findAdminForLogin({ email, mobile });

  if (!admin) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  if (admin.status !== "active") {
    const error = new Error("Admin account is not active");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken({
    userId: admin._id.toString(),
    email: admin.email,
    userType: "admin",
  });

  return {
    accessToken,
    admin: {
      id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      mobile: admin.mobile,
      status: admin.status,
    },
  };
};

export { createAdminService, loginAdminService };