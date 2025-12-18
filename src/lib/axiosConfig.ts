import axios from "axios";

// Base URL policy:
// - Local dev: use hardcoded dev API endpoint (no proxy)
// - Non-dev: use VITE_API_BASE_URL if provided
// const DEV_BASE = "https://bzxzsidcifkhedydujqb.supabase.co/functions/v1";
// const envBase = import.meta.env.VITE_BASE_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL
 



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
  const token = sessionStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const redirectUrl = `${window.location.origin}/`

    if (error.response?.status === 401) {
  sessionStorage.removeItem("userToken");
  window.location.replace("/auth");
}
  //   if (error.response?.status === 401) {
  //     console.warn("Unauthorized, token may have expired");
  //     sessionStorage.removeItem("userToken");
  //     // window.location.href = "/login";
  //      emailRedirectTo: redirectUrl
  // //      if (window.location.pathname !== "/auth") {
  // //   window.location.href = "/auth";
  // // }
  //   }
    return Promise.reject(error);
  }
);
