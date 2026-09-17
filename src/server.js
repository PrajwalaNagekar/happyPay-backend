import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./utils/logger.js";

let server;

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(
    {
      error,
    },
    "UNCAUGHT EXCEPTION! Shutting down..."
  );

  process.exit(1);
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const PORT = env.PORT;

    server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(
      {
        error,
      },
      "Failed to start server"
    );

    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
  logger.error(
    {
      reason,
    },
    "UNHANDLED REJECTION! Shutting down gracefully..."
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle termination signals
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");

  if (server) {
    server.close(() => {
      logger.info("Process terminated.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

startServer();