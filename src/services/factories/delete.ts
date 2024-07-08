import { AxiosError, type AxiosRequestConfig } from "axios";
import type { Api } from "../services.types";
import { useAuthStore } from "@/stores";

export function makeDeleteRequest<I>(
  path: string,
  api: Api,
  configs?: AxiosRequestConfig
) {
  const token = useAuthStore().token;
  return async (id: I) => {
    try {
      const response = await api.delete(path + "/" + id, {
        ...configs,
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        data: response.data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as AxiosError).isAxiosError
          ? (error as AxiosError).response?.data
          : (error as any),
      };
    }
  };
}
