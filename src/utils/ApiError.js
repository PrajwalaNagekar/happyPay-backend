class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    meta = null,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.meta = meta;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.defineProperty(this, "message", {
      enumerable: true,
      writable: true,
      value: message,
    });
  }

  // ==============================
  // Static Error Helpers
  // ==============================

  static badRequest(message = "Bad Request", meta = null) {
    return new ApiError(400, message, meta);
  }

  static unauthorized(message = "Unauthorized", meta = null) {
    return new ApiError(401, message, meta);
  }

  static forbidden(message = "Forbidden", meta = null) {
    return new ApiError(403, message, meta);
  }

  static notFound(message = "Resource not found", meta = null) {
    return new ApiError(404, message, meta);
  }

  static conflict(message = "Conflict", meta = null) {
    return new ApiError(409, message, meta);
  }

  static tooManyRequests(
    message = "Too many requests",
    meta = null
  ) {
    return new ApiError(429, message, meta);
  }

  static internal(
    message = "Internal Server Error",
    meta = null
  ) {
    return new ApiError(500, message, meta);
  }

  // ==============================
  // JSON Response
  // ==============================

  toJSON() {
    return {
      success: false,
      message: this.message,
      data: null,
      meta: this.meta || null,
    };
  }
}

export { ApiError };

export default ApiError;