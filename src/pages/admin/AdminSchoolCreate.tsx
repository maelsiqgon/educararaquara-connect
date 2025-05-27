
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import SchoolForm from '@/components/admin/schools/SchoolForm';

const AdminSchoolCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin/escolas');
  };

  const handleCancel = () => {
    navigate('/admin/escolas');
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-education-primary">Criar Nova Escola</h1>
            <p className="text-gray-600">Adicione uma nova escola à rede municipal</p>
          </div>
          
          <SchoolForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminSchoolCreate;
