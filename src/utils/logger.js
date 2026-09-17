import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "otp",
      "token",
      "accessToken",
      "refreshToken",
      "cardNumber",
      "cvv",
    ],
    censor: "[Redacted]",
  },

  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

export default logger;