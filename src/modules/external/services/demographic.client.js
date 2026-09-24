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

const getBankList = async () => {
  const response = await providerClient.get(
    "/api/public/aeps5/bank5/banks"
  );
  const banks = result?.data || [];

  const total = banks.length;

  const skip = (page - 1) * limit;

  const paginatedBanks = banks.slice(
    skip,
    skip + limit
  );

  const totalPages = Math.ceil(total / limit);

  return {
    data: paginatedBanks,

    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};

export {
  verifyAadhar,
  verifyPan,
  verifyAccount,
  getBankList,
};