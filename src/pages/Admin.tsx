
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import AdminCore from './admin/AdminCore';
import AdminModules from './admin/AdminModules';

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/*" element={<AdminCore />} />
        <Route path="/modules/*" element={<AdminModules />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
