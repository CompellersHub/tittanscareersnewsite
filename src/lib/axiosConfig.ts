import axios from "axios";

// Base URL policy:
// - Local dev: use hardcoded dev API endpoint (no proxy)
// - Non-dev: use VITE_API_BASE_URL if provided
const DEV_BASE = "https://bzxzsidcifkhedydujqb.supabase.co/functions/v1";
const envBase = import.meta.env.VITE_BASE_URL;
const BASE_URL = import.meta.env.DEV
  ? DEV_BASE
  : (envBase && envBase.trim() ? envBase : "");

if (!import.meta.env.DEV && !envBase) {
  console.warn("VITE_API_BASE_URL is not set. Configure it in Netlify env.");
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized, token may have expired");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
