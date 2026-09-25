import { findRetailerById } from "../repository/aeps.repository.js";

/* ==============================
   Get Retailer KYC Details
============================== */

const getRetailerKycDetails = async (retailerId) => {
  // Validate retailer ID
  if (!retailerId) {
    const error = new Error("Retailer ID is required");
    error.statusCode = 400;
    throw error;
  }

  // Find retailer
  const retailer = await findRetailerById(retailerId);

  if (!retailer) {
    const error = new Error("Retailer not found");
    error.statusCode = 404;
    throw error;
  }

  // Return KYC details
  return {
    retailerId: retailer._id,
    aadhaarNumber: retailer.aadhaarNumber || null,
    panNumber: retailer.panNumber || null,
    outletId: retailer.outletId || null,
    fullName: retailer.fullName || null,
    mobile: retailer.mobile || null,
    email: retailer.email || null,
  };
};

export { getRetailerKycDetails };
