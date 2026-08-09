import { apiClient } from "./serviceRequests";

function authConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function loginAdmin(payload) {
  const response = await apiClient.post("/admin/login", payload);
  return response.data;
}

export async function getAdminRequests(token, status) {
  const response = await apiClient.get("/admin/service-requests", {
    ...authConfig(token),
    params: status ? { status } : undefined,
  });
  return response.data;
}

export async function updateRequestStatus(token, id, status) {
  const response = await apiClient.patch(`/admin/service-requests/${id}/status`, { status }, authConfig(token));
  return response.data;
}
