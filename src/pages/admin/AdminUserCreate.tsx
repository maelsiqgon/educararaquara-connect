
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '@/components/admin/users/UserForm';
import BackButton from '@/components/admin/navigation/BackButton';

const AdminUserCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin/users');
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Criar Novo Usuário</h1>
          <p className="text-muted-foreground">
            Adicione um novo usuário ao sistema
          </p>
        </div>
      </div>
      
      <BackButton to="/admin/users" label="Voltar para Usuários" />
      
      <UserForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default AdminUserCreate;
