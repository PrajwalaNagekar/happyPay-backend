import {
    retailerLogin,
    retailerLogout,
  } from "../services/auth.services.js"; 

  import ApiResponse from "../../../utils/ApiResponse.js";
  
  
  const loginRetailer = async (
    req,
    res
  ) => {
    try {
  
      const {
        email,
        otp,
        fcmToken,
        deviceId,
        platform,
        deviceName,
      } = req.body;
  
  
      const data = await retailerLogin({
        email,
        otp,
        fcmToken,
        deviceId,
        platform,
        deviceName,
      });
  
  
      return res
        .status(200)
        .json(
          ApiResponse.success(
            data,
            "Login successful"
          )
        );
  
    } catch (error) {
  
      return res
        .status(
          error.statusCode || 500
        )
        .json(
          ApiResponse.error(
            error.message ||
              "Login failed"
          )
        );
    }
  };
  
  
  const logoutRetailer = async (
    req,
    res
  ) => {
    try {

      const {
        refreshToken,
        deviceId,
      } = req.body;

      await retailerLogout({
        refreshToken,
        deviceId,
      });

      return res
        .status(200)
        .json(
          ApiResponse.success(
            null,
            "Logout successful"
          )
        );

    } catch (error) {

      return res
        .status(
          error.statusCode || 500
        )
        .json(
          ApiResponse.error(
            error.message ||
              "Logout failed"
          )
        );
    }
  };


  export {
    loginRetailer,
    logoutRetailer,
  };