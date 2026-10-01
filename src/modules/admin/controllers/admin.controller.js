import { asyncHandler } from '../../../utils/asyncHandler.js';
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

export const register = asyncHandler(async (req, res) => {
  const admin = await registerAdmin(req.body, req);
    return res.status(201).json(ApiResponse.success({ admin }, "Admin registered successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginAdmin(req.body, req);
    return res.status(200).json(ApiResponse.success(data, "Admin login successful"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const data = await forgotAdminPassword(req.body);
    return res.status(200).json(ApiResponse.success(data, data.message));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const data = await resetAdminPassword(req.body);
    return res.status(200).json(ApiResponse.success(data, data.message));
});

export const list = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiResponse.success(await getRetailers(req.query), "Retailers fetched successfully"));
});

export const detail = asyncHandler(async (req, res) => {
  return res.status(200).json(ApiResponse.success(await getRetailer(req.params.id), "Retailer fetched successfully"));
});

export const updateKyc = asyncHandler(async (req, res) => {
  const { status, reason } = req.body;
    const result = await updateRetailerKycStatus(req.params.id, status, reason);
    return res.status(200).json(ApiResponse.success(result, "Retailer KYC updated successfully"));
});

export const getAuditLogs = asyncHandler(async (req, res) => {
  const result = await listAdminAuditLogs(req.query);
    return res.status(200).json(ApiResponse.success(result, "Audit logs fetched successfully"));
});

