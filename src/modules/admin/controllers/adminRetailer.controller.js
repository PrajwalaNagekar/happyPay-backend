import ApiResponse from "../../../utils/ApiResponse.js";
import { getRetailer, getRetailers } from "../services/adminRetailer.service.js";

const list = async (req, res) => {
  try {
    return res.status(200).json(ApiResponse.success(await getRetailers(req.query), "Retailers fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch retailers"));
  }
};

const detail = async (req, res) => {
  try {
    return res.status(200).json(ApiResponse.success(await getRetailer(req.params.id), "Retailer fetched successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500).json(ApiResponse.error(error.message || "Unable to fetch retailer"));
  }
};

export { list, detail };
