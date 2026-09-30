import mongoose from "mongoose";

const auditActorSchema = new mongoose.Schema(
  {
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const adminAuditLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true, trim: true, index: true },
    entity: { type: String, required: true, trim: true, index: true },
    entityId: { type: String, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, index: true },
    role: { type: String, required: true, trim: true },
    createdBy: { type: auditActorSchema, required: true },
    updatedBy: { type: auditActorSchema, required: true },
    ipAddress: { type: String, trim: true },
    userAgent: { type: String, trim: true },
  },
  { timestamps: true },
);

const AdminAuditLog = mongoose.model("AdminAuditLog", adminAuditLogSchema);

export default AdminAuditLog;
