import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "./src/modules/auth/model/Admin.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existingAdmin = await Admin.findOne({ email: "admin@happypay.com" });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const admin = new Admin({
      name: "Super Admin",
      email: "admin@happypay.com",
      mobile: "9999999999",
      passwordHash: hashedPassword,
      role: "super_admin",
      status: "active",
      isActive: true
    });

    await admin.save();
    console.log("Admin seeded successfully! Credentials: admin@happypay.com / admin123");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
