/**
 * VitaExpress — ProtectedRoute
 * Redirects unauthenticated users to login
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useApp();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
