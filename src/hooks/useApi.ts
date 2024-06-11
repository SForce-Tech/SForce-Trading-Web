// src/hooks/useApi.ts
import { useState, useEffect, useCallback } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "../api"; // Import the default export

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useApi = <T>(config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = useCallback(async () => {
    setResponse({ data: null, error: null, loading: true });
    try {
      const result: AxiosResponse<T> = await apiClient(config);
      setResponse({ data: result.data, error: null, loading: false });
    } catch (err: any) {
      // Cast err to any
      let errorMessage = "Something went wrong";
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setResponse({ data: null, error: errorMessage, loading: false });
    }
  }, [config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...response, fetchData };
};

export default useApi;
