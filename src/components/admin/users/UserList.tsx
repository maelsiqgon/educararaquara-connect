
import React from 'react';
import { Eye, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from '@/hooks/useUsers';
import type { User } from '@/types/user';

interface UserListProps {
  onEditUser: (user: User) => void;
  onViewUser: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onEditUser, onViewUser }) => {
  const { users, loading, deleteUser, toggleUserStatus } = useUsers();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${name}"?`)) {
      await deleteUser(id);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await toggleUserStatus(id, !currentStatus);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'admin':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Administrador';
      default:
        return 'Usuário';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-education-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`text-white ${getRoleBadgeColor(user.role)}`}
                >
                  {getRoleLabel(user.role)}
                </Badge>
                <Badge variant={user.active ? "default" : "secondary"}>
                  {user.active ? "Ativo" : "Inativo"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Criado em</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewUser(user)}
                  className="flex items-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditUser(user)}
                  className="flex items-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(user.id, user.active)}
                  className={`flex items-center space-x-1 ${
                    user.active 
                      ? 'text-orange-600 hover:text-orange-800' 
                      : 'text-green-600 hover:text-green-800'
                  }`}
                >
                  {user.active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                  <span>{user.active ? 'Desativar' : 'Ativar'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(user.id, user.name)}
                  className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Excluir</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {users.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Nenhum usuário encontrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserList;
