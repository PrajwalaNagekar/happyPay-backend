import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    refreshTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        deviceId: {
          type: String,
          required: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
        lastUsedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    devices: [
      {
        deviceId: {
          type: String,
          required: true,
        },
        fcmToken: {
          type: String,
        },
        platform: {
          type: String,
          enum: ["android", "ios", "web"],
        },
        deviceName: {
          type: String,
        },
        lastUsedAt: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;