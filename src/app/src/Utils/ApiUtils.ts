import axios, { AxiosInstance } from "axios";
import { IApi, IApiResponse } from "./Types/IApi";

console.log("BASE_URL:", process.env.REACT_APP_API_BASE_URL);
console.log("API_KEY:", process.env.REACT_APP_API_KEY);

// Ensure the variables are correctly retrieved
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";
const API_KEY = process.env.REACT_APP_API_KEY || "";

if (!BASE_URL) {
  console.error("BASE_URL is missing. Please set REACT_APP_API_BASE_URL in the .env file.");
}
if (!API_KEY) {
  console.error("API_KEY is missing. Please set REACT_APP_API_KEY in the .env file.");
}

const api = (): IApi => {

  const getUrl = (): string => {
    return BASE_URL;
  };

  const getAxios = (): AxiosInstance => {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10_000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Automatically append the API key to all requests
    instance.interceptors.request.use(
      (config) => {
        if (!config.params) {
          config.params = {};
        }
        config.params.api_key = API_KEY; // Append the API key as a query parameter
        console.log("Request sent:", config);
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => {
        console.log("Response received:", response);
        return response;
      },
      (error) => {
        console.error("Response error:", error.response?.status);
        return Promise.reject(error);
      }
    );

    return instance;
  };

  const get = async <T>(url: string): Promise<IApiResponse<T>> => {
    const instance = getAxios();
    const response = await instance.get(url);
    return response.data;
  };

  const getWithParams = async <T>(url: string, params: Record<string, any>): Promise<IApiResponse<T>> => {
    const instance = getAxios();
    const response = await instance.get(url, { params });
    return response.data;
  };

  const post = async <T, U>(url: string, payload: T): Promise<IApiResponse<U>> => {
    const instance = getAxios();
    const response = await instance.post(url, payload);
    return response.data;
  };

  const put = async <T, U>(url: string, payload: T): Promise<IApiResponse<U>> => {
    const instance = getAxios();
    const response = await instance.put(url, payload);
    return response.data;
  };

  const del = async <T>(url: string): Promise<IApiResponse<T>> => {
    const instance = getAxios();
    const response = await instance.delete(url);
    return response.data;
  };

  return { getUrl, getAxios, get, getWithParams, post, put, del };
};

export default api();