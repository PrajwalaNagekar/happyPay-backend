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


const verifyPan = async ({
  pan,
  latitude,
  longitude,
  txnid,
  nameOnCard,
  dateOfBirth,
}) => {
  const form = new FormData();

  form.append("pan", pan);
  form.append("latitude", latitude);
  form.append("longitude", longitude);
  form.append("txnid", txnid);
  form.append("nameOnCard", nameOnCard);
  form.append("dateOfBirth", dateOfBirth);

  const response = await providerClient.post(
    "/api/public/demographic/verifyPan",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );

  return response.data;
};

const verifyAccount = async ({
  accountNumber,
  bankIfsc,
  latitude,
  longitude,
  txnid,
}) => {
  const form = new FormData();

  form.append("accountNumber", accountNumber);
  form.append("bankIfsc", bankIfsc);
  form.append("latitude", latitude);
  form.append("longitude", longitude);
  form.append("txnid", txnid);

  const response = await providerClient.post(
    "/api/public/demographic/AccVerify",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );

  return response.data;
};


const getBankList = async ({ page = 1, limit = 10 } = {}) => {
  const response = await providerClient.get(
    "/api/public/aeps5/bank5/banks"
  );

  console.log("========== BANK API RESPONSE ==========");
  console.log("response.data:", response.data);
  console.log("BankList:", response.data?.BankList);
  console.log("Is Array:", Array.isArray(response.data?.BankList));
  console.log("=======================================");

  const banks = response.data?.BankList || [];

  const total = banks.length;
  const skip = (page - 1) * limit;

  return {
    data: banks.slice(skip, skip + limit),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const doEkyc = async ({ outlet_id }) => {
  const form = new FormData();

  form.append("outlet_id", outlet_id);

  const response = await providerClient.post(
    "/api/public/aeps5/bank5/doekyc",
    form,
    {
      headers: {
        ...form.getHeaders(),
      },
    }
  );

  return response.data;
};

const verifyBiometric = doEkyc;

export {
  verifyAadhar,
  verifyPan,
  verifyAccount,
  getBankList,
  verifyBiometric,
};