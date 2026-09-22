import { verifyAccessToken } from "../utils/jwt.js";

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token required"));
    }

    const decoded = verifyAccessToken(token);

    socket.user = decoded;

    next();
  } catch (error) {
    next(new Error("Invalid or expired access token"));
  }
};

export default socketAuth;