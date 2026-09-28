export const sendPushNotification = async (fcmTokens, title, body, data = {}) => {
  if (!fcmTokens || fcmTokens.length === 0) {
    console.log("No FCM tokens provided. Skipping push notification.");
    return;
  }
  
  // MOCK: In a real scenario, this would use firebase-admin SDK
  console.log(`[PUSH NOTIFICATION MOCK] Sending to ${fcmTokens.length} devices...`);
  console.log(`Title: ${title}`);
  console.log(`Body: ${body}`);
  console.log(`Data:`, data);
  console.log(`Tokens:`, fcmTokens);
  
  return true;
};
