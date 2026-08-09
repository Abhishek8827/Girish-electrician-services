import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/admin";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (localStorage.getItem("girish_admin_token")) return <Navigate to="/admin/requests" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await loginAdmin({ email, password });
      localStorage.setItem("girish_admin_token", response.token);
      navigate("/admin/requests", { replace: true });
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-brand-black px-6 py-12 text-brand-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-dark p-7 sm:p-9">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-brand-yellow"><ArrowLeft size={18} aria-hidden="true" /> Back to home</Link>
        <LockKeyhole size={32} className="mt-10 text-brand-yellow" aria-hidden="true" />
        <h1 className="mt-5 text-3xl font-extrabold">Admin sign in</h1>
        <p className="mt-3 leading-7 text-brand-gray">Use the credentials configured only in the server environment.</p>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="text-sm font-bold">Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field mt-2" autoComplete="username" required /></label>
          <label className="text-sm font-bold">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="field mt-2" autoComplete="current-password" required /></label>
          {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
          <button disabled={isLoading} className="rounded-full bg-brand-yellow px-6 py-3 font-bold text-brand-black disabled:opacity-60">{isLoading ? "Signing in…" : "Sign in"}</button>
        </form>
      </div>
    </main>
  );
}

export default AdminLoginPage;
