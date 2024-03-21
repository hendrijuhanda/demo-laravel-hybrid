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

/**
 *
 */
interface LoginPayload {
  email: string;
  password: string;
}

export const loginRequest: (data: LoginPayload) => Promise<AxiosResponse> = (
  data
) => instance.post("/login", data);

/**
 *
 */
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

/**
 *
 */
export const registerRequest: (
  data: RegisterPayload
) => Promise<AxiosResponse> = (data) => instance.post("/register", data);

/**
 *
 */
export const sessionRequest: () => Promise<AxiosResponse> = () =>
  instance.get("/session");

/**
 *
 */
export const logoutRequest: () => Promise<AxiosResponse> = () =>
  instance.post("/logout");

/**
 *
 */
interface TransactionsParam {
  page?: number;
  per_page?: number;
  type?: "topup" | "transaction";
  description?: string;
  transaction_id?: string;
}

export const getTransactionsRequest: (
  params: TransactionsParam
) => Promise<AxiosResponse> = (params) =>
  instance.get("/transactions", { params });

/**
 *
 */
export const createTransactionRequest: (data: any) => Promise<AxiosResponse> = (
  data
) =>
  instance.post("/transaction", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/**
 *
 */
export const getBalanceRequest: () => Promise<AxiosResponse> = () =>
  instance.get("/balance");
