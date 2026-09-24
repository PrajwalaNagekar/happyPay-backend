import FormData from "form-data";
import providerClient from "../../../config/provider.client.js";

const onboardMerchant = async ({
  mobile,
  name,
  gender,
  pan,
  email,
  aadhaar,
  fulladdress,
  pincode,
  city,
  dob,
  latitude,
  longitude,
}) => {
  const formData = new FormData();

  formData.append("mobile", mobile);
  formData.append("name", name);
  formData.append("gender", gender);
  formData.append("pan", pan);
  formData.append("email", email);
  formData.append("aadhaar", aadhaar);
  formData.append("fulladdress", fulladdress);
  formData.append("pincode", pincode);
  formData.append("city", city);
  formData.append("dob", dob);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);

  const response = await providerClient.post(
    "/api/public/aeps5/bank5/onboard",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
    }
  );

  return response.data;
};

export default onboardMerchant;