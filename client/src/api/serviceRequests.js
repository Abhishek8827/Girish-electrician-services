import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

export async function submitServiceRequest(formData) {
  const response = await apiClient.post("/service-requests", formData);
  return response.data;
}
