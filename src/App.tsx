
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "@/contexts/MockDataContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminPasswordRecovery from "./pages/AdminPasswordRecovery";
import AdminProtected from "./components/AdminProtected";
import Institucional from "./pages/Institucional";
import Escolas from "./pages/Escolas";
import Projetos from "./pages/Projetos";
import Noticias from "./pages/Noticias";
import Contato from "./pages/Contato";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MockDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/escolas" element={<Escolas />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/recuperar-senha" element={<AdminPasswordRecovery />} />
            <Route path="/admin" element={
              <AdminProtected>
                <Admin />
              </AdminProtected>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MockDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
