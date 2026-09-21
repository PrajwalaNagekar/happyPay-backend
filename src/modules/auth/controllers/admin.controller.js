import { createAdminService } from "../services/admin.services.js";

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

export { createAdminController };