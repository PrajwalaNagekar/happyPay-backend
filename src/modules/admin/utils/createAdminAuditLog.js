import AdminAuditLog from "../model/adminAuditLog.model.js";

const createAdminAuditLog = async ({
  action,
  entity,
  entityId,
  description,
  admin,
  req,
}) => {
  if (!action || !entity || !description || !admin) {
    throw new Error("Audit log action, entity, description and admin are required");
  }

  const actor = {
    adminId: admin._id || admin.id,
    name: admin.name || admin.email,
    role: admin.role || "super_admin",
  };

  return AdminAuditLog.create({
    action,
    entity,
    entityId: entityId ? String(entityId) : undefined,
    description,
    userName: actor.name,
    role: actor.role,
    createdBy: actor,
    updatedBy: actor,
    ipAddress: req?.ip,
    userAgent: req?.get?.("user-agent"),
  });
};

export default createAdminAuditLog;
