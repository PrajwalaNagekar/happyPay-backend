import User from "../../auth/model/user.model.js";

const retailerProjection = "-refreshTokens -devices -permissions -roles -bank.accountNumber -bank.confirmAccountNumber";

const listRetailers = async ({ page = 1, limit = 20, search, status, kycStatus }) => {
  const query = {};
  if (status) query.status = status;
  if (kycStatus) query.kycStatus = kycStatus;
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { mobile: { $regex: search, $options: "i" } },
      { "shop.name": { $regex: search, $options: "i" } },
    ];
  }
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    User.find(query).select(retailerProjection).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(query),
  ]);
  return { items: items.map((item) => ({ ...item, id: item._id.toString() })), total, page, limit, totalPages: Math.ceil(total / limit) };
};

const findRetailerById = (id) => User.findById(id).select(retailerProjection).lean();

export { listRetailers, findRetailerById };
