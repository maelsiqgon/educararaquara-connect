
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "@/contexts/MockDataContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminPasswordRecovery from "./pages/AdminPasswordRecovery";
import SchoolAdmin from "./pages/SchoolAdmin";
import Institucional from "./pages/Institucional";
import Escolas from "./pages/Escolas";
import EscolaDetalhes from "./pages/EscolaDetalhes";
import Noticias from "./pages/Noticias";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MockDataProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/password-recovery" element={<AdminPasswordRecovery />} />
              <Route path="/admin/escola/:schoolId" element={<SchoolAdmin />} />
              <Route path="/school-admin/:schoolId" element={<SchoolAdmin />} />
              <Route path="/institucional" element={<Institucional />} />
              <Route path="/escolas" element={<Escolas />} />
              <Route path="/escola/:schoolId" element={<EscolaDetalhes />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MockDataProvider>
    </QueryClientProvider>
  );
}

export default App;
