
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MockDataProvider } from "@/contexts/MockDataContext";
import Index from "./pages/Index";
import Escolas from "./pages/Escolas";
import EscolaDetalhes from "./pages/EscolaDetalhes";
import Noticias from "./pages/Noticias";
import Institucional from "./pages/Institucional";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminPasswordRecovery from "./pages/AdminPasswordRecovery";
import SchoolAdmin from "./pages/SchoolAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockDataProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/escolas" element={<Escolas />} />
            <Route path="/escola/:id" element={<EscolaDetalhes />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<Noticias />} />
            <Route path="/institucional" element={<Institucional />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/password-recovery" element={<AdminPasswordRecovery />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/escola/:id" element={<SchoolAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MockDataProvider>
  </QueryClientProvider>
);

export default App;
