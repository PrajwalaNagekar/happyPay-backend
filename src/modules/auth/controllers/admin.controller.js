import { createAdminService, loginAdminService } from "../services/admin.services.js";
import ApiResponse from "../../../utils/ApiResponse.js";

const createAdminController = async (req, res) => {
  try {
    const admin = await createAdminService(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        mobile: admin.mobile,
        roles: admin.roles,
        status: admin.status,
      },
    });
  } catch (error) {
    console.log("Create admin error:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    const data = await loginAdminService({
      email,
      mobile,
      password,
    });

    return res
      .status(200)
      .json(ApiResponse.success(data, "Login successful"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(ApiResponse.error(error.message || "Login failed"));
  }
};

export { createAdminController, loginAdmin };