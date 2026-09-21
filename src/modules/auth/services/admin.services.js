import bcrypt from "bcrypt";
import Role from "../model/Role.model.js";

import {
  findByEmail,
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
  

export { createAdminService };