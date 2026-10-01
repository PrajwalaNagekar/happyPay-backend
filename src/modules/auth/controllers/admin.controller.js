import { asyncHandler } from '../../../utils/asyncHandler.js';
import {
  createAdminService,
  loginAdminService,
  getPendingRetailersService,
  approveRetailerService,
  rejectRetailerService,
} from "../services/admin.services.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const createAdminController = asyncHandler(async (req, res) => {
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
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, mobile, password } = req.body;

    const data = await loginAdminService({
      email,
      mobile,
      password,
    });

    return res
      .status(200)
      .json(ApiResponse.success(data, "Login successful"));
});

export const getPendingRetailers = asyncHandler(async (req, res) => {
  const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );

    const result = await getPendingRetailersService({
      page,
      limit,
    });

    return res
      .status(200)
      .json(
        ApiResponse.success(
          result.data,
          "Pending retailers fetched successfully",
          result.meta
        )
      );
});

export const approveRetailer = asyncHandler(async (req, res) => {
  const data = await approveRetailerService(req.params.retailerId);

    return res
      .status(200)
      .json(ApiResponse.success(data, "Retailer approved successfully"));
});

export const rejectRetailer = asyncHandler(async (req, res) => {
  const data = await rejectRetailerService(
      req.params.retailerId,
      req.body.reasonOfRejection
    );

    return res
      .status(200)
      .json(ApiResponse.success(data, "Retailer rejected successfully"));
});

