import ApiResponse from "../../../utils/ApiResponse.js";

import { sendKycApprovedNotification, sendKycRejectedNotification } from "../services/notification.services.js";

const sendKycApprovedNotificationController =
  async (req, res) => {
    try {
      const { retailerId } = req.body;

      if (!retailerId) {
        return res.status(400).json(
          ApiResponse.error(
            "retailerId is required"
          )
        );
      }

      const result =
        await sendKycApprovedNotification({
          retailerId,
        });

      return res
        .status(result.statusCode)
        .json(
          result.success
            ? ApiResponse.success(
              result.data,
              result.message
            )
            : ApiResponse.error(
              result.message
            )
        );
    } catch (error) {
      console.error(
        "KYC notification controller error:",
        error
      );

      return res.status(500).json(
        ApiResponse.error(
          "Failed to send KYC notification"
        )
      );
    }
  };
const sendKycRejectedNotificationController =
  async (req, res) => {
    try {
      const {
        retailerId,
        rejectionReason,
      } = req.body;

      if (!retailerId) {
        return res.status(400).json(
          ApiResponse.error(
            "retailerId is required"
          )
        );
      }

      if (!rejectionReason?.trim()) {
        return res.status(400).json(
          ApiResponse.error(
            "rejectionReason is required"
          )
        );
      }

      const result =
        await sendKycRejectedNotification({
          retailerId,
          rejectionReason:
            rejectionReason.trim(),
        });

      return res
        .status(result.statusCode)
        .json(
          result.success
            ? ApiResponse.success(
              result.data,
              result.message
            )
            : ApiResponse.error(
              result.message
            )
        );
    } catch (error) {
      console.error(
        "KYC rejection notification error:",
        error
      );

      return res.status(500).json(
        ApiResponse.error(
          "Failed to send KYC rejection notification"
        )
      );
    }
  };
export {
  sendKycApprovedNotificationController,
  sendKycRejectedNotificationController,
};