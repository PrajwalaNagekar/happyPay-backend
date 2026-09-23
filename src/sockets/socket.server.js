import { Server } from "socket.io";
import { verifyAccessToken } from "../utils/jwt.js";

let io;

const initializeSocket = (httpServer) => {
  const allowedOrigins = (process.env.CORS_ORIGINS || process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  // -----------------------------
  // SOCKET AUTHENTICATION
  // -----------------------------
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const decoded = verifyAccessToken(token);

      socket.user = decoded;

      next();
    } catch (error) {
      next(new Error("Invalid or expired access token"));
    }
  });

  // -----------------------------
  // CONNECTION
  // -----------------------------
  io.on("connection", (socket) => {
    const { userId, userType } = socket.user;

    console.log("Socket connected:", socket.id);
    console.log("User ID:", userId);
    console.log("User Type:", userType);

    // --------------------------------
    // PERSONAL ROOM
    // --------------------------------
    socket.join(`${userType}:${userId}`);

    console.log(
      `Joined personal room: ${userType}:${userId}`
    );

    // --------------------------------
    // JOIN SUPPORT TICKET
    // --------------------------------
    socket.on("support:join-ticket", async (ticketId) => {
      try {
        socket.join(`ticket:${ticketId}`);

        console.log(
          `${userId} joined ticket:${ticketId}`
        );

        socket.emit("support:joined-ticket", {
          ticketId,
        });
      } catch (error) {
        console.error(
          "Join ticket error:",
          error
        );
      }
    });

    // --------------------------------
    // LEAVE SUPPORT TICKET
    // --------------------------------
    socket.on("support:leave-ticket", (ticketId) => {
      socket.leave(`ticket:${ticketId}`);

      console.log(
        `${userId} left ticket:${ticketId}`
      );
    });

    // --------------------------------
    // DISCONNECT
    // --------------------------------
    socket.on("disconnect", (reason) => {
      console.log(
        `Socket disconnected: ${socket.id}`,
        reason
      );
    });
  });

  return io;
};

// --------------------------------
// GET SOCKET INSTANCE
// --------------------------------
const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
};

export {
  initializeSocket,
  getIO,
};