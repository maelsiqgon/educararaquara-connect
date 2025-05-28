
import React from 'react';
import SchoolContentManager from '@/components/admin/SchoolContentManager';

const AdminSchools = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Escolas</h1>
        <p className="text-muted-foreground">
          Gerencie informações das escolas do sistema
        </p>
      </div>
      
      <SchoolContentManager />
    </div>
  );
};

export default AdminSchools;
