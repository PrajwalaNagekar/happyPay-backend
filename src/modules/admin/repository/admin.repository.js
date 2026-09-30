import Admin from "../../auth/model/Admin.model.js";

const findAdminByEmail = (email) => Admin.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
const findAdminByMobile = (mobile) => Admin.findOne({ mobile: mobile.trim() }).select("+passwordHash");
const createAdmin = (data) => Admin.create(data);
const updateAdminLogin = (adminId, refreshToken, expiresAt) => Admin.findByIdAndUpdate(adminId, { lastLoginAt: new Date(), $push: { refreshTokens: { token: refreshToken, expiresAt } } }, { new: true });
const savePasswordResetToken = (adminId, tokenHash, expiresAt) => Admin.findByIdAndUpdate(adminId, { resetPasswordTokenHash: tokenHash, resetPasswordExpiresAt: expiresAt }, { new: true });
const findAdminByResetToken = (tokenHash) => Admin.findOne({ resetPasswordTokenHash: tokenHash, resetPasswordExpiresAt: { $gt: new Date() } }).select("+passwordHash +resetPasswordTokenHash +resetPasswordExpiresAt");
const updateAdminPassword = (adminId, passwordHash) => Admin.findByIdAndUpdate(adminId, { passwordHash, $unset: { resetPasswordTokenHash: 1, resetPasswordExpiresAt: 1 }, $set: { updatedAt: new Date() } }, { new: true });

export { findAdminByEmail, findAdminByMobile, createAdmin, updateAdminLogin, savePasswordResetToken, findAdminByResetToken, updateAdminPassword };
