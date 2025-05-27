
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import UserForm from '@/components/admin/users/UserForm';
import { useUsers, User } from '@/hooks/useUsers';
import { Loader2 } from 'lucide-react';

const AdminUserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && users.length > 0) {
      const foundUser = users.find(u => u.id === id);
      setUser(foundUser || null);
      setLoading(false);
    }
  }, [id, users]);

  const handleSuccess = () => {
    navigate('/admin/usuarios');
  };

  const handleCancel = () => {
    navigate('/admin/usuarios');
  };

  if (loading) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="container mx-auto px-4 py-8 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </AdminProtected>
    );
  }

  if (!user) {
    return (
      <AdminProtected>
        <div className="min-h-screen bg-gray-50">
          <AdminHeader />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-500">Usuário não encontrado</h1>
              <p className="text-gray-600 mt-2">O usuário solicitado não foi encontrado.</p>
            </div>
          </div>
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-education-primary">Editar Usuário</h1>
            <p className="text-gray-600">Edite as informações do usuário {user.name}</p>
          </div>
          
          <UserForm
            user={user}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </AdminProtected>
  );
};

export default AdminUserEdit;
