import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Admin from "../modules/auth/model/Admin.model.js";
import Role from "../modules/auth/model/Role.model.js";
import { createAdminService } from "../modules/auth/services/admin.services.js";


const seedAdmin = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
  
      console.log("MongoDB connected");
  
      const admin = await createAdminService({
        firstName: process.env.ADMIN_FIRST_NAME,
        lastName: process.env.ADMIN_LAST_NAME,
        email: process.env.ADMIN_EMAIL,
        mobile: process.env.ADMIN_MOBILE,
        password: process.env.ADMIN_PASSWORD,
        roleSlug: "super-admin",
      });
  
      console.log("Admin created successfully");
  
      console.log({
        id: admin._id,
        email: admin.email,
        roles: admin.roles,
      });
  
      process.exit(0);
    } catch (error) {
      console.error("Admin seed failed:", error.message);
      process.exit(1);
    }
  };

seedAdmin();