
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUsers } from "@/hooks/useUsers";
import { Edit, Trash2, Plus, Search, Mail, Phone, Shield, UserCheck, UserX } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const UserList = () => {
  const { users, loading, deleteUser, updateUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (userId: string, userName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o usuário "${userName}"?`)) {
      try {
        await deleteUser(userId);
        toast.success('Usuário excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir usuário');
      }
    }
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUser(userId, { active: !currentStatus });
      toast.success(`Usuário ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (error) {
      toast.error('Erro ao atualizar status do usuário');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'super_admin': 'bg-red-100 text-red-800',
      'admin': 'bg-blue-100 text-blue-800',
      'manager': 'bg-green-100 text-green-800',
      'editor': 'bg-yellow-100 text-yellow-800',
      'viewer': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      'super_admin': 'Super Admin',
      'admin': 'Administrador',
      'manager': 'Gerente',
      'editor': 'Editor',
      'viewer': 'Visualizador'
    };
    return labels[role] || role;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Carregando usuários...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">Todas as funções</option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Administrador</option>
            <option value="manager">Gerente</option>
            <option value="editor">Editor</option>
            <option value="viewer">Visualizador</option>
          </select>
          
          <Button asChild>
            <Link to="/admin/users/create">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Link>
          </Button>
        </div>
      </div>

      {/* Users grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>{getInitials(user.name || user.email)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">{user.name || 'Sem nome'}</CardTitle>
                  <div className="flex items-center gap-2">
                    {user.active ? (
                      <UserCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <UserX className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${user.active ? 'text-green-600' : 'text-red-600'}`}>
                      {user.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="truncate">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>Função:</span>
                </div>
                <Badge className={getRoleBadgeColor(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
              </div>

              {user.last_access && (
                <div className="text-xs text-gray-500">
                  Último acesso: {new Date(user.last_access).toLocaleDateString('pt-BR')}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex gap-2 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                asChild
              >
                <Link to={`/admin/users/${user.id}/edit`}>
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleActive(user.id, user.active)}
                className={user.active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
              >
                {user.active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(user.id, user.name || user.email)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchTerm || roleFilter !== 'all' 
              ? 'Nenhum usuário encontrado com os filtros aplicados'
              : 'Nenhum usuário cadastrado ainda'
            }
          </div>
          {!searchTerm && roleFilter === 'all' && (
            <Button asChild>
              <Link to="/admin/users/create">
                <Plus className="h-4 w-4 mr-2" />
                Cadastrar primeiro usuário
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
