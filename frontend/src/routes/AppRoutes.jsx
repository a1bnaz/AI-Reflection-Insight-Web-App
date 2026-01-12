import { Routes, Route, Navigate } from "react-router-dom";


import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotesPage from "../pages/NotesPage";

import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


      {/* PROTECTED ROUTES */}
      {/* we wrap these inside our ProtectedRoute component */}
      <Route element={<ProtectedRoute />}>
        {/* dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* notes page */}
        <Route path="notes" element={<NotesPage/>}/>



        {/* profile page */}
        <Route
          path="/profile"
          element={<div>Profile Page (coming soon)</div>}
        />
        
      </Route>
            

      {/* CATCH ALL */}
      {/* if the user types a random URL, send them to login or dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRoutes;