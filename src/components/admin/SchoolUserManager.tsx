
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUsers } from '@/hooks/useUsers';
import { Users, Search, Plus, Edit, Trash2, UserCheck, UserX, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const SchoolUserManager = () => {
  const { users, loading, toggleUserStatus, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleLabels = (userRoles: any[]) => {
    if (!userRoles || userRoles.length === 0) return ['Sem função'];
    
    return userRoles.map(role => {
      const roleLabels = {
        super_admin: 'Super Admin',
        admin: 'Administrador',
        director: 'Diretor',
        coordinator: 'Coordenador',
        teacher: 'Professor',
        staff: 'Funcionário',
        parent: 'Responsável',
        student: 'Aluno'
      };
      return roleLabels[role.role as keyof typeof roleLabels] || role.role;
    });
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    await toggleUserStatus(userId, !currentStatus);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      await deleteUser(userId);
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-soft">
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-education-primary">Gestão de Usuários</CardTitle>
            <CardDescription>
              Gerencie usuários, suas funções e permissões no sistema
            </CardDescription>
          </div>
          <Button asChild className="bg-education-primary hover:bg-education-dark">
            <Link to="/admin/usuarios/criar">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar usuários por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Lista de usuários */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário cadastrado'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? 'Tente ajustar os termos de busca.' 
                : 'Comece criando o primeiro usuário do sistema.'
              }
            </p>
            {!searchTerm && (
              <Button asChild className="bg-education-primary hover:bg-education-dark">
                <Link to="/admin/usuarios/criar">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Usuário
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-education-light flex items-center justify-center flex-shrink-0">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-education-primary font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                      )}
                    </div>

                    {/* Informações do usuário */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-education-primary truncate">
                          {user.name}
                        </h3>
                        <Badge className={user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {user.active ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                      
                      {/* Funções */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {getRoleLabels(user.roles || []).map((role, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>

                      {/* Informações adicionais */}
                      <div className="text-xs text-gray-500 space-y-1">
                        {user.phone && (
                          <div>Telefone: {user.phone}</div>
                        )}
                        {user.registration && (
                          <div>Matrícula: {user.registration}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusToggle(user.id, user.active)}
                      className={user.active ? "text-orange-600 hover:text-orange-700" : "text-green-600 hover:text-green-700"}
                    >
                      {user.active ? (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Ativar
                        </>
                      )}
                    </Button>
                    
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/admin/usuarios/editar/${user.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Link>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SchoolUserManager;
