import { useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { MdArrowBack, MdCheckCircle, MdSearch, MdShield } from "react-icons/md";
import { trackServiceRequest } from "../api/serviceRequests";

function TrackRequestPage() {
  const [requestId, setRequestId] = useState("");
  const [contact, setContact] = useState("");
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setRequest(null);
    setIsLoading(true);

    try {
      const response = await trackServiceRequest({ requestId, contact });
      setRequest(response.request);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "We could not look up that request. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-black px-6 py-12 text-brand-white sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-yellow hover:text-brand-yellow-glow"
        >
          <MdArrowBack size={18} aria-hidden="true" /> Back to home
        </Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">
          Request tracking
        </p>
        <h1 className="mt-4 text-4xl font-extrabold">
          Check your service request.
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-brand-gray">
          Enter your request ID and the phone number or email address used when
          you submitted the request.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-5 rounded-3xl border border-white/10 bg-brand-dark p-6 sm:p-8"
        >
          <label className="text-sm font-bold">
            Request ID
            <input
              value={requestId}
              onChange={(event) => setRequestId(event.target.value)}
              placeholder="ELC-2026-0001"
              className="field mt-2"
              required
            />
          </label>
          <label className="text-sm font-bold">
            Email address or phone number
            <input
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="The contact detail used in your request"
              className="field mt-2"
              required
            />
          </label>
          {error && (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 py-3 font-bold text-brand-black disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? (
              <CgSpinner size={20} className="animate-spin" />
            ) : (
              <MdSearch size={18} aria-hidden="true" />
            )}{" "}
            <span>{isLoading ? "Checking…" : "Track request"}</span>
          </button>
        </form>

        {request && (
          <section
            className="mt-8 rounded-3xl border border-brand-yellow/30 bg-brand-dark p-6 sm:p-8"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-brand-gray">{request.requestId}</p>
                <h2 className="mt-1 text-2xl font-bold">
                  {request.serviceType}
                </h2>
              </div>
              <span className="rounded-full bg-brand-yellow px-3 py-1 text-sm font-bold text-brand-black">
                {request.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-brand-gray">
              Preferred visit: {request.preferredDate} at{" "}
              {request.preferredTime}
            </p>
            <ol className="mt-8 space-y-5 border-l border-brand-yellow/40 pl-6">
              {request.statusHistory.map((item) => (
                <li
                  key={`${item.status}-${item.changedAt}`}
                  className="relative"
                >
                  <MdCheckCircle
                    size={18}
                    className="absolute -left-[2.05rem] top-0 rounded-full bg-brand-dark text-brand-yellow"
                    aria-hidden="true"
                  />
                  <p className="font-bold">{item.status}</p>
                  <p className="mt-1 text-sm text-brand-gray">
                    {new Date(item.changedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <p className="mt-8 flex items-start gap-2 text-sm leading-6 text-brand-gray">
          <MdShield
            size={18}
            className="mt-0.5 shrink-0 text-brand-yellow"
            aria-hidden="true"
          />{" "}
          We verify your contact detail before showing request information.
        </p>
      </div>
    </main>
  );
}

export default TrackRequestPage;
