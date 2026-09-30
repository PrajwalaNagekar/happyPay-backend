import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    balanceBefore: {
      type: Number,
      required: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
    service: {
      type: String,
      enum: ["AEPS", "DMT", "RECHARGE", "CMS", "PAYOUT", "MANUAL", "COMMISSION"],
      required: true,
    },
    referenceId: {
      type: String,
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "reversed"],
      default: "pending",
    },
    description: {
      type: String,
    },
    commissionEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
