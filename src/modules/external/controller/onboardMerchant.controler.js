import onboardMerchant from "../services/onboardMerchant.client.js";

const onboardMerchantController = async (req, res, next) => {
  try {
    const {
      mobile,
      name,
      gender,
      pan,
      email,
      aadhaar,
      fulladdress,
      pincode,
      city,
      dob,
      latitude,
      longitude,
    } = req.body;

    const result = await onboardMerchant({
      mobile,
      name,
      gender,
      pan,
      email,
      aadhaar,
      fulladdress,
      pincode,
      city,
      dob,
      latitude,
      longitude,
    });

    return res.status(200).json({
      success: true,
      message: "Merchant onboarded successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export {
  onboardMerchantController,
};