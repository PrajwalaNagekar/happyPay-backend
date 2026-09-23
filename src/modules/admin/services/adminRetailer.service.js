import ApiError from "../../../utils/ApiError.js";
import { findRetailerById, listRetailers } from "../repository/adminRetailer.repository.js";

const getRetailers = async (filters = {}) => {
  const page = Math.max(Number(filters.page) || 1, 1);
  const limit = Math.min(Math.max(Number(filters.limit) || 20, 1), 100);
  return listRetailers({ ...filters, page, limit });
};

const getRetailer = async (id) => {
  const retailer = await findRetailerById(id);
  if (!retailer) throw ApiError.notFound("Retailer not found");
  return { ...retailer, id: retailer._id.toString() };
};

export { getRetailers, getRetailer };
