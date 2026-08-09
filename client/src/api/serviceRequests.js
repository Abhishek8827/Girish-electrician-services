import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
});

export async function submitServiceRequest(formData) {
  const response = await apiClient.post("/service-requests", formData);
  return response.data;
}

export async function trackServiceRequest(payload) {
  const response = await apiClient.post("/service-requests/track", payload);
  return response.data;
}
