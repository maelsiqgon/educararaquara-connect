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
import AdminHome from '@/pages/admin/AdminHome';
import AdminSchools from '@/pages/admin/AdminSchools';
import AdminSchoolEdit from '@/pages/admin/AdminSchoolEdit';
import AdminSchoolCreate from '@/pages/admin/AdminSchoolCreate';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminUserEdit from '@/pages/admin/AdminUserEdit';
import AdminUserCreate from '@/pages/admin/AdminUserCreate';
import AdminMedia from '@/pages/admin/AdminMedia';
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
                path="/admin"
                element={
                  <AdminProtected>
                    <AdminHome />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/escolas"
                element={
                  <AdminProtected>
                    <AdminSchools />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/escolas/editar/:id"
                element={
                  <AdminProtected>
                    <AdminSchoolEdit />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/escolas/criar"
                element={
                  <AdminProtected>
                    <AdminSchoolCreate />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/usuarios"
                element={
                  <AdminProtected>
                    <AdminUsers />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/usuarios/editar/:id"
                element={
                  <AdminProtected>
                    <AdminUserEdit />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/usuarios/criar"
                element={
                  <AdminProtected>
                    <AdminUserCreate />
                  </AdminProtected>
                }
              />
              <Route
                path="/admin/media"
                element={
                  <AdminProtected>
                    <AdminMedia />
                  </AdminProtected>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
