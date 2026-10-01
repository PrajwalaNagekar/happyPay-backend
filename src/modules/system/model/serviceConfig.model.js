import mongoose from "mongoose";

const serviceConfigSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      unique: true,
      enum: ["aeps", "bbps", "recharge", "cms", "upi", "payout"],
    },
    displayName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    currentProvider: {
      type: String,
      required: true,
      default: "default_provider",
    },
    apiKeys: {
      type: Map,
      of: String,
    },
    minTransactionAmount: {
      type: Number,
      default: 0,
    },
    maxTransactionAmount: {
      type: Number,
      default: 100000,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ServiceConfig", serviceConfigSchema);
