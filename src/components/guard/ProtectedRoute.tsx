// src/components/ProtectedRoute.tsx
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

// Usage in routes:
// <Route element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />