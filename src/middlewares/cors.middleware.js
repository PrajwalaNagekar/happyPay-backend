import cors from "cors";
import env from "../config/env.js";

const allowedOrigins = env.CORS_ORIGINS
  .split(",")
  .map((origin) => origin.trim());

const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests without an Origin header
    // (Postman, server-to-server requests, etc.)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS policy: Origin ${origin} is not allowed`)
    );
  },

  credentials: true,

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Request-ID",
  ],
});

export default corsMiddleware;