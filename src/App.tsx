
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Schools from '@/pages/Schools';
import SchoolDetail from '@/pages/SchoolDetail';
import Contact from '@/pages/Contact';
import AdminLogin from '@/pages/AdminLogin';
import Admin from '@/pages/Admin';
import AdminProtected from '@/components/AdminProtected';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-white">
            <Toaster />
            <Routes>
              <Route path="/auth" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/escolas" element={<Schools />} />
              <Route path="/escolas/:id" element={<SchoolDetail />} />
              <Route path="/contato" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <AdminProtected>
                    <Admin />
                  </AdminProtected>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
