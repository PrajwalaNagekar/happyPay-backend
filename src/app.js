import express from "express";

import corsMiddleware from "./middlewares/cors.middleware.js";
import errorMiddleware from "./middlewares/error.middlware.js";
import requestLogger from "./middlewares/requestLogger.middleare.js";
import ApiError from "./utils/apiError.js";
import otpRoutes from "./modules/routes/otp.routes.js";
import emailOtpRoutes from "./modules/routes/emailOtp.routes.js";
const app = express();

/* ==============================
   Global Middleware
============================== */

app.use(corsMiddleware);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

/* ==============================
   Health Check
============================== */

app.get("/", (req, res) => {
  res.json({
    requestId: req.id,
    success: true,
    message: "Happy pay API is running",
  });
});

/* ==============================
   User Routes
============================== */

app.use("/api/v1/otp", otpRoutes);
app.use("/api/v1/email-otp", emailOtpRoutes);
/* ==============================
   404 Handler
============================== */

app.use((req, res, next) => {
  next(
    ApiError.notFound(
      `Cannot ${req.method} ${req.originalUrl}`
    )
  );
});

/* ==============================
   Error Middleware
============================== */

app.use(errorMiddleware);

export default app;