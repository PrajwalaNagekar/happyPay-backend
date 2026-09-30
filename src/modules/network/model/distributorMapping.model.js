import mongoose from "mongoose";

const distributorMappingSchema = new mongoose.Schema(
  {
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // A retailer can only have one distributor
    },
    distributorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customCommissionSlabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commission",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    mappedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to speed up lookups for a distributor's network
distributorMappingSchema.index({ distributorId: 1, isActive: 1 });

export default mongoose.model("DistributorMapping", distributorMappingSchema);
