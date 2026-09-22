import mongoose from "mongoose";

const supportMessageSchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportTicket",
      required: true,
      index: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    senderType: {
      type: String,
      enum: ["retailer", "admin"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    attachments: [
      {
        url: {
          type: String,
          trim: true,
        },
        fileName: {
          type: String,
          trim: true,
        },
        fileType: {
          type: String,
          trim: true,
        },
      },
    ],

    isInternal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SupportMessage = mongoose.model(
  "SupportMessage",
  supportMessageSchema
);

export default SupportMessage;