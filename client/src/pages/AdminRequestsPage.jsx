import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdLogout, MdRefresh } from "react-icons/md";
import { apiBaseUrl } from "../api/serviceRequests";
import {
  getAdminRequests,
  getElectricians,
  updateRequestStatus,
} from "../api/admin";

const statuses = [
  "",
  "Pending",
  "Contacted",
  "Scheduled",
  "Completed",
  "Cancelled",
];

function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("createdAt_desc");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [electricians, setElectricians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("girish_admin_token");

  const loadRequests = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await getAdminRequests(token, {
        status: statusFilter,
        sortBy: sortOrder,
        emergency: emergencyOnly,
        searchId: searchId,
        page: currentPage,
      });
      const electriciansResponse = await getElectricians(token);
      setRequests(response.requests);
      setPagination(response.pagination);
      setElectricians(electriciansResponse.electricians);
    } catch (loadError) {
      if (loadError.response?.status === 401) {
        localStorage.removeItem("girish_admin_token");
        navigate("/admin", { replace: true });
        return;
      }
      setError(
        loadError.response?.data?.message || "Unable to load service requests.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    navigate,
    statusFilter,
    sortOrder,
    emergencyOnly,
    searchId,
    currentPage,
    token,
  ]);

  useEffect(() => {
    const refreshTimer = window.setTimeout(loadRequests, 0);
    return () => window.clearTimeout(refreshTimer);
  }, [loadRequests]);

  async function changeStatus(requestId, assignedElectrician, status) {
    setUpdatingId(requestId);
    try {
      const response = await updateRequestStatus(
        token,
        requestId,
        assignedElectrician,
        status,
      );
      setRequests((current) =>
        current.map((request) =>
          request._id === requestId ? response.request : request,
        ),
      );
    } catch (updateError) {
      setError(
        updateError.response?.data?.message ||
          "Unable to update the request status.",
      );
    } finally {
      setUpdatingId("");
    }
  }

  function signOut() {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("girish_admin_token");
      navigate("/admin", { replace: true });
    }
  }

  return (
    <main className="min-h-screen bg-brand-black px-6 py-10 text-brand-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">
              Private area
            </p>
            <h1 className="mt-3 text-3xl font-extrabold">Service requests</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/electricians"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
            >
              Manage Electricians
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
            >
              <MdArrowBack size={16} aria-hidden="true" /> Site
            </Link>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-black"
            >
              <MdLogout size={16} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-white/10 bg-brand-dark p-4">
          <label className="text-sm font-bold">
            Search ID
            <input
              type="search"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="ELC-..."
              className="ml-2 w-32 rounded-lg border border-white/20 bg-brand-black px-3 py-2 text-brand-white"
            />
          </label>
          <label className="text-sm font-bold">
            Status{" "}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="ml-2 rounded-lg border border-white/20 bg-brand-black px-3 py-2 text-brand-white"
            >
              <option value="">All statuses</option>
              {statuses.slice(1).map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-bold">
            Sort by{" "}
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="ml-2 rounded-lg border border-white/20 bg-brand-black px-3 py-2 text-brand-white"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="preferredDate_asc">Soonest Visit</option>
              <option value="preferredDate_desc">Latest Visit</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={(e) => setEmergencyOnly(e.target.checked)}
              className="h-4 w-4 accent-brand-yellow"
            />
            Show emergency only
          </label>
          <button
            onClick={loadRequests}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-yellow"
          >
            <MdRefresh size={16} aria-hidden="true" /> Refresh
          </button>
        </div>
        {error && (
          <p
            className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-red-100"
            role="alert"
          >
            {error}
          </p>
        )}
        {isLoading ? (
          <p className="mt-10 text-brand-gray">Loading requests…</p>
        ) : (
          <div className="mt-6 grid gap-5">
            {requests.length === 0 ? (
              <p className="rounded-2xl border border-white/10 p-8 text-brand-gray">
                No requests match this filter yet.
              </p>
            ) : (
              <>
                {requests.map((request) => (
                  <article
                    key={request._id}
                    className="rounded-2xl border border-white/10 bg-brand-dark p-5 sm:p-6"
                  >
                    <div className="flex flex-wrap justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-brand-yellow">
                          {request.requestId}
                        </p>
                        <h2 className="mt-1 text-xl font-bold">
                          {request.name}
                        </h2>
                        <p className="mt-1 text-sm text-brand-gray">
                          {request.phone} · {request.email}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label className="text-sm font-bold">Assign To</label>
                        <select
                          value={
                            request.assignedElectrician?._id || "unassigned"
                          }
                          disabled={updatingId === request._id}
                          onChange={(event) =>
                            changeStatus(
                              request._id,
                              event.target.value,
                              request.status,
                            )
                          }
                          className="ml-2 rounded-lg border border-brand-yellow/50 bg-brand-black px-3 py-2 text-brand-white disabled:opacity-60"
                        >
                          <option value="unassigned">Unassigned</option>
                          {electricians.map((e) => (
                            <option key={e._id} value={e._id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                        <label className="text-sm font-bold sm:ml-4">
                          Status
                        </label>
                        <select
                          value={request.status}
                          disabled={updatingId === request._id}
                          onChange={(event) =>
                            changeStatus(
                              request._id,
                              request.assignedElectrician?._id,
                              event.target.value,
                            )
                          }
                          className="ml-2 rounded-lg border border-brand-yellow/50 bg-brand-black px-3 py-2 text-brand-white disabled:opacity-60"
                        >
                          {statuses.slice(1).map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-3">
                      <p>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">
                          Service
                        </span>
                        {request.serviceType}
                      </p>
                      <p>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">
                          Preferred visit
                        </span>
                        {request.preferredDate} at {request.preferredTime}
                      </p>
                      <p>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">
                          Property
                        </span>
                        {request.propertyType}
                      </p>
                    </div>
                    <p className="mt-4 leading-7 text-brand-gray">
                      <span className="font-bold text-brand-white">
                        Address:
                      </span>{" "}
                      {request.address}
                    </p>
                    <p className="mt-2 leading-7 text-brand-gray">
                      <span className="font-bold text-brand-white">Issue:</span>{" "}
                      {request.description}
                    </p>
                    {request.image?.url && (
                      <a
                        href={`${apiBaseUrl.replace("/api", "")}${request.image.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block text-sm font-bold text-brand-yellow"
                      >
                        Open customer image
                      </a>
                    )}
                  </article>
                ))}
                {pagination && pagination.pages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <button
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={pagination.page === 1}
                      className="rounded-lg border border-white/20 px-3 py-1.5 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="font-bold">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={pagination.page === pagination.pages}
                      className="rounded-lg border border-white/20 px-3 py-1.5 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminRequestsPage;
