import ApiResponse from "../../../utils/ApiResponse.js";
import { getRetailerKycDetails } from "../services/aeps.service.js";

/* ==============================
   Get Retailer KYC Details Controller
============================== */

const getRetailerKycDetailsController = async (req, res) => {
  try {
    const { retailerId } = req.params;

    console.log("Fetching KYC details for retailer:", retailerId);

    const kycDetails = await getRetailerKycDetails(retailerId);

    return res.status(200).json(
      ApiResponse.success(
        kycDetails,
        "Retailer KYC details fetched successfully"
      )
    );
  } catch (error) {
    console.log("Error fetching KYC details:", error.message);

    return res
      .status(error.statusCode || 500)
      .json(
        ApiResponse.error(
          error.message || "Failed to fetch KYC details"
        )
      );
  }
};

export { getRetailerKycDetailsController };
