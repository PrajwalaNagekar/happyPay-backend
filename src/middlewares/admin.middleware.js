const requireAdmin = (req, res, next) => {
  if (req.user?.userType !== "admin" || req.user?.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access is required",
    });
  }

  next();
};

export default requireAdmin;
