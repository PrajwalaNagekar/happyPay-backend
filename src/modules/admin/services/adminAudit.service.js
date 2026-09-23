import findAdminAuditLogs from "../repository/adminAudit.repository.js";

const listAdminAuditLogs = async (filters = {}) => {
  const page = Math.max(Number(filters.page) || 1, 1);
  const limit = Math.min(Math.max(Number(filters.limit) || 20, 1), 100);

  return findAdminAuditLogs({
    ...filters,
    page,
    limit,
  });
};

export default listAdminAuditLogs;
