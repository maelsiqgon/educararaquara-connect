
import React from 'react';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import AdminWelcome from '@/components/admin/AdminWelcome';

const AdminHome = () => {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <AdminWelcome />
          <DashboardStats />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminHome;
