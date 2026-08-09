import { ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api/serviceRequests";
import { getAdminRequests, updateRequestStatus } from "../api/admin";

const statuses = ["", "Pending", "Contacted", "Scheduled", "Completed", "Cancelled"];

function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
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
      const response = await getAdminRequests(token, statusFilter);
      setRequests(response.requests);
    } catch (loadError) {
      if (loadError.response?.status === 401) {
        localStorage.removeItem("girish_admin_token");
        navigate("/admin", { replace: true });
        return;
      }
      setError(loadError.response?.data?.message || "Unable to load service requests.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, statusFilter, token]);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  async function changeStatus(requestId, status) {
    setUpdatingId(requestId);
    try {
      const response = await updateRequestStatus(token, requestId, status);
      setRequests((current) => current.map((request) => request._id === requestId ? response.request : request));
    } catch (updateError) {
      setError(updateError.response?.data?.message || "Unable to update the request status.");
    } finally {
      setUpdatingId("");
    }
  }

  function signOut() {
    localStorage.removeItem("girish_admin_token");
    navigate("/admin", { replace: true });
  }

  return (
    <main className="min-h-screen bg-brand-black px-6 py-10 text-brand-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">Private area</p><h1 className="mt-3 text-3xl font-extrabold">Service requests</h1></div>
          <div className="flex gap-3"><Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"><ArrowLeft size={16} aria-hidden="true" /> Site</Link><button onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 text-sm font-bold text-brand-black"><LogOut size={16} aria-hidden="true" /> Sign out</button></div>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-brand-dark p-4">
          <label className="text-sm font-bold">Status <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="ml-2 rounded-lg border border-white/20 bg-brand-black px-3 py-2 text-brand-white"><option value="">All statuses</option>{statuses.slice(1).map((status) => <option key={status}>{status}</option>)}</select></label>
          <button onClick={loadRequests} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-yellow"><RefreshCw size={16} aria-hidden="true" /> Refresh</button>
        </div>
        {error && <p className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-red-100" role="alert">{error}</p>}
        {isLoading ? <p className="mt-10 text-brand-gray">Loading requests…</p> : (
          <div className="mt-6 grid gap-5">
            {requests.length === 0 ? <p className="rounded-2xl border border-white/10 p-8 text-brand-gray">No requests match this filter yet.</p> : requests.map((request) => (
              <article key={request._id} className="rounded-2xl border border-white/10 bg-brand-dark p-5 sm:p-6">
                <div className="flex flex-wrap justify-between gap-4"><div><p className="text-sm font-bold text-brand-yellow">{request.requestId}</p><h2 className="mt-1 text-xl font-bold">{request.name}</h2><p className="mt-1 text-sm text-brand-gray">{request.phone} · {request.email}</p></div><label className="text-sm font-bold">Status <select value={request.status} disabled={updatingId === request._id} onChange={(event) => changeStatus(request._id, event.target.value)} className="ml-2 rounded-lg border border-brand-yellow/50 bg-brand-black px-3 py-2 text-brand-white disabled:opacity-60">{statuses.slice(1).map((status) => <option key={status}>{status}</option>)}</select></label></div>
                <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 md:grid-cols-3"><p><span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">Service</span>{request.serviceType}</p><p><span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">Preferred visit</span>{request.preferredDate} at {request.preferredTime}</p><p><span className="block text-xs font-bold uppercase tracking-wider text-brand-gray">Property</span>{request.propertyType}</p></div>
                <p className="mt-4 leading-7 text-brand-gray"><span className="font-bold text-brand-white">Address:</span> {request.address}</p><p className="mt-2 leading-7 text-brand-gray"><span className="font-bold text-brand-white">Issue:</span> {request.description}</p>
                {request.image?.url && <a href={`${apiBaseUrl.replace('/api', '')}${request.image.url}`} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-brand-yellow">Open customer image</a>}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminRequestsPage;
