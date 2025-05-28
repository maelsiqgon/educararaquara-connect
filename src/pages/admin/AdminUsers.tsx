
import React from 'react';
import UserList from '@/components/admin/users/UserList';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h1>
        <p className="text-muted-foreground">
          Gerencie usuários e suas permissões no sistema
        </p>
      </div>
      
      <UserList />
    </div>
  );
};

export default AdminUsers;
