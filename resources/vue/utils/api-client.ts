import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

interface LoginPayload {
  email: string;
  password: string;
}

export const loginRequest: (data: LoginPayload) => Promise<AxiosResponse> = (
  data
) => instance.post("/login", data);

export const sessionRequest: () => Promise<AxiosResponse> = () =>
  instance.get("/session");

export const logoutRequest: () => Promise<AxiosResponse> = () =>
  instance.post("/logout");
