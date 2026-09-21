import {
  verifyAadhar,
} from "../services/demographic.client.js";

const verifyAadharController = async (
  req,
  res
) => {
  try {
    console.log(
      "Aadhaar request:",
      req.body
    );

    const result = await verifyAadhar(
      req.body
    );

    console.log(
      "Aadhaar provider response:",
      result
    );

    return res.status(200).json({
      success: true,
      message:
        "Provider API called successfully",
      data: result,
    });

  } catch (error) {

    console.log(
      "========== PROVIDER API ERROR =========="
    );

    console.log(
      "Message:",
      error.message
    );

    console.log(
      "Status:",
      error.response?.status
    );

    console.log(
      "Provider response:",
      error.response?.data
    );

    console.log(
      "========================================"
    );

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message: "Provider API failed",
      error:
        error.response?.data ||
        error.message,
    });
  }
};

export {
  verifyAadharController,
};