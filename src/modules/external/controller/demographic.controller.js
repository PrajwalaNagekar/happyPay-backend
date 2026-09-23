import {
  getBankList,
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



const verifyPanController = async (req, res) => {
  try {
    const {
      pan,
      latitude,
      longitude,
      txnid,
      nameOnCard,
      dateOfBirth,
    } = req.body;

    const result = await verifyPan({
      pan,
      latitude,
      longitude,
      txnid,
      nameOnCard,
      dateOfBirth,
    });

    return res.status(200).json({
      success: true,
      message: "PAN verification successful",
      data: result,
    });
  } catch (error) {
    console.log("PAN verification error:", error.message);
    console.log("Provider response:", error.response?.data);

    return res.status(error.response?.status || 500).json({
      success: false,
      message: "PAN verification failed",
      error: error.response?.data || error.message,
    });
  }
};

const verifyAccountController = async (req, res) => {
  try {
    const {
      accountNumber,
      bankIfsc,
      latitude,
      longitude,
      txnid,
    } = req.body;

    const result = await verifyAccount({
      accountNumber,
      bankIfsc,
      latitude,
      longitude,
      txnid,
    });

    return res.status(200).json({
      success: true,
      message: "Account verification successful",
      data: result,
    });
  } catch (error) {
    console.log("Account verification error:", error.message);
    console.log("Provider response:", error.response?.data);

    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Account verification failed",
      error: error.response?.data || error.message,
    });
  }
};


const getBankListController = async (req, res) => {
  try {
    const result = await getBankList();
    return res.status(200).json({
      success: true,
      message: "Bank list fetched successfully",
      data: result,
    });
  }
  catch (error) {
    console.log("Bank list fetching error:", error.message);
    console.log("Provider response:", error.response?.data);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Bank list fetching failed",
      error: error.response?.data || error.message,
    });
  }
};

export {
  verifyAadharController,
  verifyPanController,
  verifyAccountController,
  getBankListController,
};