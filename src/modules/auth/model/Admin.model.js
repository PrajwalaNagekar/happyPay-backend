import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    mobile: { type: String, required: true, unique: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["super_admin"], default: "super_admin" },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    resetPasswordTokenHash: { type: String, select: false },
    resetPasswordExpiresAt: { type: Date, select: false },
    refreshTokens: [{
      token: { type: String, required: true },
      expiresAt: { type: Date, required: true },
      createdAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
