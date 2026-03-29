/**
 * VitaExpress — App Router
 * Design: Verdant Wellness — routes for all pages
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider, useApp } from "./contexts/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Cardapio from "./pages/Cardapio";
import Pedido from "./pages/Pedido";
import PedidoRealizado from "./pages/PedidoRealizado";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

function RootRedirect() {
  const { isAuthenticated } = useApp();
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate(isAuthenticated ? "/cardapio" : "/login");
  }, [isAuthenticated, navigate]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RootRedirect} />
      <Route path="/login" component={Login} />
      <Route path="/cardapio">
        <ProtectedRoute>
          <Cardapio />
        </ProtectedRoute>
      </Route>
      <Route path="/pedido">
        <ProtectedRoute>
          <Pedido />
        </ProtectedRoute>
      </Route>
      <Route path="/pedido-realizado/:id">
        {(params) => (
          <ProtectedRoute>
            <PedidoRealizado />
          </ProtectedRoute>
        )}
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/perfil">
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            <Router />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
