import { AxiosInstance } from "axios";

/**
 * Represents the structure of an API response.
 * @template T The type of the data in the API response.
 */
export interface IApiResponse<T> {
  /** The payload returned from the API. */
  data: T;

  /** The HTTP status code of the response. */
  status: number;

  /** An optional message, often used for error descriptions or additional context. */
  message?: string;
}

/**
 * Interface for interacting with the API utility.
 */
export interface IApi {
  /**
   * Retrieves the base URL for the API.
   * @returns The base URL as a string.
   */
  getUrl: () => string;

  /**
   * Creates and returns an Axios instance pre-configured with default settings.
   * @returns A configured `AxiosInstance`.
   */
  getAxios: () => AxiosInstance;

  /**
   * Sends a GET request to the specified URL.
   * @template T The type of the expected response data.
   * @param url The endpoint to send the GET request to.
   * @returns A promise resolving to an `IApiResponse` containing the response data.
   */
  get: <T>(url: string) => Promise<IApiResponse<T>>;

  /**
   * Sends a GET request to the specified URL with query parameters.
   * @template T The type of the expected response data.
   * @param url The endpoint to send the GET request to.
   * @param params An object containing query parameters to include in the request.
   * @returns A promise resolving to an `IApiResponse` containing the response data.
   */
  getWithParams: <T>(url: string, params: Record<string, any>) => Promise<IApiResponse<T>>;

  /**
   * Sends a POST request to the specified URL with a payload.
   * @template T The type of the request payload.
   * @template U The type of the expected response data.
   * @param url The endpoint to send the POST request to.
   * @param payload The data to include in the request body.
   * @returns A promise resolving to an `IApiResponse` containing the response data.
   */
  post: <T, U>(url: string, payload: T) => Promise<IApiResponse<U>>;

  /**
   * Sends a PUT request to the specified URL with a payload.
   * @template T The type of the request payload.
   * @template U The type of the expected response data.
   * @param url The endpoint to send the PUT request to.
   * @param payload The data to include in the request body.
   * @returns A promise resolving to an `IApiResponse` containing the response data.
   */
  put: <T, U>(url: string, payload: T) => Promise<IApiResponse<U>>;

  /**
   * Sends a DELETE request to the specified URL.
   * @template T The type of the expected response data.
   * @param url The endpoint to send the DELETE request to.
   * @returns A promise resolving to an `IApiResponse` containing the response data.
   */
  del: <T>(url: string) => Promise<IApiResponse<T>>;
}
