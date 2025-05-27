
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import UserForm from '@/components/admin/users/UserForm';

const AdminUserCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin/usuarios');
  };

  const handleCancel = () => {
    navigate('/admin/usuarios');
  };

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-education-primary">Criar Novo Usuário</h1>
            <p className="text-gray-600">Adicione um novo usuário ao sistema</p>
          </div>
          
          <UserForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminUserCreate;
