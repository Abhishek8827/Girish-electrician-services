import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack, MdDelete, MdPersonAdd } from "react-icons/md";
import {
  addElectrician,
  getElectricians,
  deleteElectrician,
} from "../api/admin";

function AdminElectriciansPage() {
  const [electricians, setElectricians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("girish_admin_token");

  const loadElectricians = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await getElectricians(token);
      setElectricians(response.electricians);
    } catch (loadError) {
      setError("Unable to load electricians.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadElectricians();
  }, [loadElectricians]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addElectrician(token, form);
      setForm({ name: "", phone: "" });
      loadElectricians(); // Refresh the list
    } catch (addError) {
      setError(
        addError.response?.data?.message || "Failed to add electrician.",
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this electrician? This cannot be undone.",
      )
    ) {
      try {
        await deleteElectrician(token, id);
        loadElectricians(); // Refresh the list
      } catch (deleteError) {
        setError(
          deleteError.response?.data?.message ||
            "Failed to delete electrician.",
        );
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-black px-6 py-10 text-brand-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-yellow">
              Admin Panel
            </p>
            <h1 className="mt-3 text-3xl font-extrabold">
              Manage Electricians
            </h1>
          </div>
          <Link
            to="/admin/requests"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
          >
            <MdArrowBack size={16} aria-hidden="true" /> Back to Requests
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-brand-dark p-6 sm:grid-cols-[1fr_1fr_auto]"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Electrician's Name"
            className="field"
            required
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="field"
            required
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-5 py-2.5 font-bold text-brand-black"
          >
            <MdPersonAdd size={18} /> Add
          </button>
        </form>

        {error && (
          <p
            className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-red-100"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="mt-6">
          {isLoading ? (
            <p className="text-brand-gray">Loading electricians...</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {electricians.map((e) => (
                <li
                  key={e._id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-bold text-brand-white">{e.name}</p>
                    <p className="text-sm text-brand-gray">{e.phone}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="text-red-400 hover:text-red-300"
                    aria-label={`Delete ${e.name}`}
                  >
                    <MdDelete size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminElectriciansPage;
