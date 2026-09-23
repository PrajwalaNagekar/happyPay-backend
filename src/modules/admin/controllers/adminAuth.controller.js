import ApiResponse from "../../../utils/ApiResponse.js";
import { forgotAdminPassword, loginAdmin, registerAdmin, resetAdminPassword } from "../services/adminAuth.service.js";

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

export { register, login, forgotPassword, resetPassword };
