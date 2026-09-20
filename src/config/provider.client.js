import axios from "axios";
import env from "../config/env.js";

const providerClient = axios.create({
  baseURL: env.PROVIDER_BASE_URL,
  timeout: 30000,
  headers: {
    "api-key": env.PROVIDER_API_KEY,
  },
});

export default providerClient;