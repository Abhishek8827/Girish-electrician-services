import { apiClient } from "./serviceRequests";

function authConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function loginAdmin(payload) {
  const response = await apiClient.post("/admin/login", payload);
  return response.data;
}

export async function getAdminRequests(token, filters = {}) {
  const params = {};
  if (filters.status) params.status = filters.status;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.emergency) params.emergency = filters.emergency;
  if (filters.searchId) params.searchId = filters.searchId;
  if (filters.page) params.page = filters.page;

  const response = await apiClient.get("/admin/service-requests", {
    ...authConfig(token),
    params,
  });
  return response.data;
}

export async function updateRequestStatus(
  token,
  id,
  assignedElectrician,
  status,
) {
  const response = await apiClient.patch(
    `/admin/service-requests/${id}/status`,
    { status, assignedElectrician },
    authConfig(token),
  );
  return response.data;
}

export async function getElectricians(token) {
  const response = await apiClient.get(
    "/admin/electricians",
    authConfig(token),
  );
  return response.data;
}

export async function addElectrician(token, payload) {
  const response = await apiClient.post(
    "/admin/electricians",
    payload,
    authConfig(token),
  );
  return response.data;
}

export async function deleteElectrician(token, id) {
  const response = await apiClient.delete(
    `/admin/electricians/${id}`,
    authConfig(token),
  );
  return response.data;
}
