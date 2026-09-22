import multer from "multer";
import path from "path";

import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import ApiError from "./ApiError.js";

/**
 * Cloudinary storage
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "happypay/support",
    resource_type: "auto",
  },
});

/**
 * Allowed MIME types
 */
const allowedMimeTypes = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",

  // Videos
  "video/mp4",
  "video/webm",
  "video/quicktime",

  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * Allowed file extensions
 *
 * Requestly sometimes sends files with:
 *
 * application/octet-stream
 *
 * So when that happens, we validate the extension.
 */
const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",

  ".mp4",
  ".webm",
  ".mov",

  ".pdf",
  ".doc",
  ".docx",
];

/**
 * Multer configuration
 */
const multerOptions = {
  storage,

  limits: {
    // Maximum size per file = 10 MB
    fileSize: 10 * 1024 * 1024,

    // Maximum number of files
    files: 25,
  },

  fileFilter: (req, file, cb) => {
    console.log("Uploaded file:");
    console.log("fieldname:", file.fieldname);
    console.log("originalname:", file.originalname);
    console.log("mimetype:", file.mimetype);

    /**
     * Normal MIME type
     */
    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    /**
     * Requestly may send some files as:
     *
     * application/octet-stream
     *
     * In that case, validate using the file extension.
     */
    if (file.mimetype === "application/octet-stream") {
      const extension = path
        .extname(file.originalname)
        .toLowerCase();

      console.log("Detected extension:", extension);

      if (allowedExtensions.includes(extension)) {
        return cb(null, true);
      }
    }

    /**
     * Reject unsupported files
     */
    console.log("Rejected MIME type:", file.mimetype);

    return cb(
      new ApiError(
        400,
        `File type ${file.mimetype} is not allowed`
      ),
      false
    );
  },
};

/**
 * Standard upload middleware
 *
 * Example:
 * upload.array("attachments", 5)
 */
export const upload = multer(multerOptions);

/**
 * Upload any field
 */
export const uploadAny = multer(multerOptions).any();

/**
 * Convert req.files into a flat array
 */
const flattenUploadedFiles = (files) => {
  if (!files) return [];

  if (Array.isArray(files)) {
    return files;
  }

  return Object.values(files).flat();
};

/**
 * Restrict uploaded file field names
 */
export const restrictUploadedFileFields =
  (allowedFieldNames = []) =>
  (req, res, next) => {
    const allowed = new Set(allowedFieldNames);

    const invalid = flattenUploadedFiles(req.files).find(
      (file) => !allowed.has(file.fieldname)
    );

    if (invalid) {
      return next(
        new ApiError(
          400,
          `Unexpected file field: ${invalid.fieldname}`
        )
      );
    }

    return next();
  };

export default upload;