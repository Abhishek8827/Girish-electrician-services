import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrackRequestPage from "./pages/TrackRequestPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import AdminElectriciansPage from "./pages/AdminElectriciansPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/track-request" element={<TrackRequestPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route
        path="/admin/requests"
        element={<ProtectedRoute element={<AdminRequestsPage />} />}
      />
      <Route
        path="/admin/electricians"
        element={<ProtectedRoute element={<AdminElectriciansPage />} />}
      />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
