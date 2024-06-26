import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";
export const DEFAULT_AVATAR = BASE_URL + "/uploads/default-avatar.png";

// export type ApiErrors = {
//   fields?: object;
//   message?: string;
//   code?: number;
// };

// type ErrorItem = {
//   key: string;
//   value: string;
// };

// type Errors = {
//   code: number;
//   message: string;
//   fields: ErrorItem[];
// };

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = window.localStorage.getItem("token") || "";
  }

  return config;
});

export default client;
