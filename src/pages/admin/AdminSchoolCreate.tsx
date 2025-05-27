
import React from 'react';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminSchoolCreate = () => {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-education-primary mb-8">Criar Nova Escola</h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p>Formulário de criação de escola em desenvolvimento</p>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminSchoolCreate;
