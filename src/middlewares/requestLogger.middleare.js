import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import logger from "../utils/logger.js";

const requestLogger = pinoHttp({
  logger,

  genReqId: (req) => {
    return req.headers["x-request-id"] || randomUUID();
  },

  customProps: (req) => ({
    requestId: req.id,
  }),
});

export default requestLogger;