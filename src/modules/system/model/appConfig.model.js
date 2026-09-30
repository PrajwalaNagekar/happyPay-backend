import mongoose from "mongoose";

const appConfigSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    maintenanceMessage: {
      type: String,
      default: "System is under maintenance. Please try again later.",
    },
    minimumWalletTransfer: {
      type: Number,
      default: 100, // Minimum payout amount
    },
    androidAppVersion: {
      type: String,
      default: "1.0.0",
    },
    iosAppVersion: {
      type: String,
      default: "1.0.0",
    },
    forceUpdate: {
      type: Boolean,
      default: false,
    },
    supportEmail: {
      type: String,
      default: "support@happypayfintech.com",
    },
    supportPhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AppConfig", appConfigSchema);
