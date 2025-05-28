
import React from 'react';
import MediaLibraryManager from '@/components/admin/MediaLibraryManager';

const AdminMedia = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Mídia</h1>
        <p className="text-muted-foreground">
          Gerencie imagens, vídeos e documentos do sistema
        </p>
      </div>
      
      <MediaLibraryManager />
    </div>
  );
};

export default AdminMedia;
