import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import HomePage from "./pages/HomePage";
import TrackRequestPage from "./pages/TrackRequestPage";
import { businessConfig } from "./data/businessConfig";

function App() {
  useEffect(() => {
    document.title = `${businessConfig.name} | Professional Electrical Services`;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/track-request" element={<TrackRequestPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/requests" element={<ProtectedAdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedAdminPage() {
  return localStorage.getItem("girish_admin_token") ? <AdminRequestsPage /> : <Navigate to="/admin" replace />;
}

export default App;
