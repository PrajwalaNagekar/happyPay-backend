import ApiResponse from "../../../utils/ApiResponse.js";
import {
  forgotAdminPassword,
  loginAdmin,
  registerAdmin,
  resetAdminPassword,
  getRetailer,
  getRetailers,
  updateRetailerKycStatus,
  listAdminAuditLogs,
} from "../services/admin.service.js";

const register = async (req, res) => {
  try {
    const admin = await registerAdmin(req.body, req);
    return res.status(201).json(ApiResponse.success({ admin }, "Admin registered successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Admin registration failed"));
  }
};

const login = async (req, res) => {
  try {
    const data = await loginAdmin(req.body, req);
    return res.status(200).json(ApiResponse.success(data, "Admin login successful"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Admin login failed"));
  }
};

const forgotPassword = async (req, res) => {
  try {
    const data = await forgotAdminPassword(req.body);
    return res.status(200).json(ApiResponse.success(data, data.message));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Password reset request failed"));
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = await resetAdminPassword(req.body);
    return res.status(200).json(ApiResponse.success(data, data.message));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Password reset failed"));
  }
};

const list = async (req, res) => {
  try {
    return res.status(200).json(ApiResponse.success(await getRetailers(req.query), "Retailers fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch retailers"));
  }
};

const detail = async (req, res) => {
  try {
    return res.status(200).json(ApiResponse.success(await getRetailer(req.params.id), "Retailer fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch retailer"));
  }
};

const updateKyc = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const result = await updateRetailerKycStatus(req.params.id, status, reason);
    return res.status(200).json(ApiResponse.success(result, "Retailer KYC updated successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to update retailer KYC"));
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const result = await listAdminAuditLogs(req.query);
    return res.status(200).json(ApiResponse.success(result, "Audit logs fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch audit logs"));
  }
};

export {
  register,
  login,
  forgotPassword,
  resetPassword,
  list,
  detail,
  updateKyc,
  getAuditLogs,
};
