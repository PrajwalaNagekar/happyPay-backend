import User from "../../auth/model/user.model.js";

/* ==============================
   Find Retailer By ID
============================== */

const findRetailerById = async (retailerId) => {
  return await User.findById(retailerId).select(
    "aadhaarNumber panNumber fullName mobile email outletId"
  );
};

export { findRetailerById };
