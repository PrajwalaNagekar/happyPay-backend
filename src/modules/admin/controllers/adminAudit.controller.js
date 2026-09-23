import ApiResponse from "../../../utils/ApiResponse.js";
import listAdminAuditLogs from "../services/adminAudit.service.js";

const getAuditLogs = async (req, res) => {
  try {
    const result = await listAdminAuditLogs(req.query);
    return res.status(200).json(ApiResponse.success(result, "Audit logs fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch audit logs"));
  }
};

export default getAuditLogs;
