import FormData from "form-data";
import providerClient from "../../../config/provider.client.js";

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
    "api/public/demographic/AccVerify",
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
  verifyAccount,
};