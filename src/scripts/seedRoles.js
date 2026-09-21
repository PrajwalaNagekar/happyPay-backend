import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Role from "../modules/auth/model/Role.model.js";

const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const existingRole = await Role.findOne({
      code: "super_admin",
    });

    if (existingRole) {
      console.log("Super Admin role already exists");
      process.exit(0);
    }

    const role = await Role.create({
      name: "Super Admin",
      slug: "super-admin",
      code: "super_admin",
      description: "Full system access",
      type: "admin",
      permissions: [],
      isSystemRole: true,
      isActive: true,
    });

    console.log("Super Admin role created:", role._id);

    process.exit(0);
  } catch (error) {
    console.error("Role seed failed:", error.message);
    process.exit(1);
  }
};

seedRoles();