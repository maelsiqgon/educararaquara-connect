
import React from 'react';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import MediaLibraryManager from '@/components/admin/MediaLibraryManager';

const AdminMedia = () => {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-education-primary mb-8">Biblioteca de Mídia</h1>
          <MediaLibraryManager />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminMedia;
