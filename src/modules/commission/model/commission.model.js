import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      enum: ["AEPS", "DMT", "RECHARGE", "CMS"],
      required: true,
    },
    providerName: {
      type: String,
      required: true, // e.g., "TVS Credit Services"
    },
    providerCode: {
      type: String,
      required: true, // e.g., "TVSCREDIT"
    },
    type: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a provider only has one active commission mapping per service
commissionSchema.index({ service: 1, providerCode: 1 }, { unique: true });

const Commission = mongoose.model("Commission", commissionSchema);

export default Commission;
