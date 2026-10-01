import AdminAuditLog from "../model/adminAuditLog.model.js";

const findAdminAuditLogs = async ({ page = 1, limit = 20, search, action, adminId, fromDate, toDate }) => {
  const query = {};

  if (search) {
    query.$or = [
      { userName: { $regex: search, $options: "i" } },
      { action: { $regex: search, $options: "i" } },
      { entity: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (action) query.action = action;
  if (adminId) query["createdBy.adminId"] = adminId;
  if (fromDate || toDate) {
    query.createdAt = {};
    if (fromDate) query.createdAt.$gte = new Date(fromDate);
    if (toDate) query.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
  }

  const skip = (page - 1) * limit;
  const [logs, total] = await Promise.all([
    AdminAuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean().then((items) => items.map((item) => ({ ...item, id: item._id.toString() }))),
    AdminAuditLog.countDocuments(query),
  ]);

  return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export default findAdminAuditLogs;
