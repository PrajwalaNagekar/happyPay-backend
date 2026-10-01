import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    gatewayProvider: {
      type: String,
      enum: ["razorpay", "cashfree", "phonepe", "paytm", "manual"],
      required: true,
    },
    status: {
      type: String,
      enum: ["initiated", "success", "failed", "pending"],
      default: "initiated",
    },
    paymentId: {
      type: String,
    },
    webhookResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
