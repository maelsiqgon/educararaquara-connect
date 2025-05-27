
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Escolas from "./pages/Escolas";
import EscolaDetalhes from "./pages/EscolaDetalhes";
import Noticias from "./pages/Noticias";
import Institucional from "./pages/Institucional";
import Projetos from "./pages/Projetos";
import Contato from "./pages/Contato";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import SchoolAdmin from "./pages/SchoolAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/escola/:id" 
              element={
                <ProtectedRoute>
                  <SchoolAdmin />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
