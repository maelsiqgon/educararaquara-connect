
import React from 'react';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminWelcome from '@/components/admin/AdminWelcome';

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema educacional
        </p>
      </div>
      
      <AdminWelcome />
      <DashboardStats />
    </div>
  );
};

export default AdminHome;
