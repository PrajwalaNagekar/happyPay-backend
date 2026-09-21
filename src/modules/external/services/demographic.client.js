import FormData from "form-data";
import providerClient from "../../../config/provider.client.js";

const verifyAadhar = async ({
  aadhaarNumber,
  latitude,
  longitude,
  txnid,
}) => {
  const form = new FormData();

  form.append(
    "aadhaarNumber",
    aadhaarNumber
  );

  form.append(
    "latitude",
    latitude
  );

  form.append(
    "longitude",
    longitude
  );

  form.append(
    "txnid",
    txnid
  );

  const response = await providerClient.post(
    "api/public/demographic/verifyAadhar",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );

  return response.data;
};

export {
  verifyAadhar,
};