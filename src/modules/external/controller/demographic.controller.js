import {
    verifyAccount,
  } from "../services/demographic.client.js";
  
  const verifyAccountController = async (req, res) => {
    try {
      console.log("========== PROVIDER REQUEST ==========");
      console.log("Request body:", req.body);
  
      const result = await verifyAccount(req.body);
  
      console.log("========== PROVIDER RESPONSE ==========");
      console.log("Response:", result);
  
      return res.status(200).json({
        success: true,
        message: "Provider API called successfully",
        data: result,
      });
  
    } catch (error) {
  
      console.log("========== PROVIDER API ERROR ==========");
  
      console.log("Message:", error.message);
  
      console.log(
        "Status:",
        error.response?.status
      );
  
      console.log(
        "Response data:",
        error.response?.data
      );
  
      console.log(
        "Response headers:",
        error.response?.headers
      );
  
      console.log(
        "Request URL:",
        error.config?.baseURL,
        error.config?.url
      );
  
      console.log(
        "Request method:",
        error.config?.method
      );
  
      console.log(
        "Request headers:",
        error.config?.headers
      );
  
      console.log("========================================");
  
      return res.status(
        error.response?.status || 500
      ).json({
        success: false,
        message: "Provider API failed",
        error: error.response?.data || error.message,
      });
    }
  };
  export {
    verifyAccountController,
  };