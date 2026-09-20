import {
    verifyAccount,
  } from "../services/demographic.client.js";
  
  const verifyAccountController = async (req, res) => {
    try {
      const result = await verifyAccount(req.body);
  
      return res.status(200).json({
        success: true,
        message: "Provider API called successfully",
        data: result,
      });
    } catch (error) {
      console.error(
        "Provider API Error:",
        error.response?.data || error.message
      );
  
      return res.status(
        error.response?.status || 500
      ).json({
        success: false,
        message: "Provider API failed",
        data: error.response?.data || null,
      });
    }
  };
  
  export {
    verifyAccountController,
  };