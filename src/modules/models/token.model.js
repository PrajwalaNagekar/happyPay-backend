import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
      trim: true,
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
  {
    timestamps: true,
  }
);

export default refreshTokenSchema;