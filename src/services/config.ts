import axios from "axios";
import { API_TIMEOUT, API_URL } from "@/constants/env";

export const AxiosConfig = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: false,
});
