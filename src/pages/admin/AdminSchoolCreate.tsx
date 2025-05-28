
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolForm from '@/components/admin/schools/SchoolForm';
import BackButton from '@/components/admin/navigation/BackButton';

const AdminSchoolCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/admin/schools');
  };

  const handleCancel = () => {
    navigate('/admin/schools');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Criar Nova Escola</h1>
          <p className="text-muted-foreground">
            Adicione uma nova escola ao sistema
          </p>
        </div>
      </div>
      
      <BackButton to="/admin/schools" label="Voltar para Escolas" />
      
      <SchoolForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default AdminSchoolCreate;
