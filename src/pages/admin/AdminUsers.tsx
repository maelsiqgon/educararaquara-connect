
import React from 'react';
import SchoolUserManager from '@/components/admin/SchoolUserManager';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h1>
        <p className="text-muted-foreground">
          Gerencie usuários e suas permissões no sistema
        </p>
      </div>
      
      <SchoolUserManager />
    </div>
  );
};

export default AdminUsers;
