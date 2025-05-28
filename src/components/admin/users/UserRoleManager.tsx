
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Shield } from "lucide-react";
import { useUsers } from '@/hooks/useUsers';
import { useSchools } from '@/hooks/useSchools';
import type { User, UserRole } from '@/types/user';

interface UserRoleManagerProps {
  selectedUser: User | null;
  onBack: () => void;
}

const UserRoleManager: React.FC<UserRoleManagerProps> = ({ selectedUser, onBack }) => {
  const { assignUserToSchool, removeUserFromSchool, fetchUsers } = useUsers();
  const { schools } = useSchools();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole['role']>('viewer');
  const [loading, setLoading] = useState(false);

  if (!selectedUser) {
    return null;
  }

  const handleAssignRole = async () => {
    if (!selectedSchool || !selectedRole) return;

    setLoading(true);
    try {
      await assignUserToSchool(selectedUser.id, selectedSchool, selectedRole);
      await fetchUsers();
      setSelectedSchool('');
      setSelectedRole('viewer');
    } catch (error) {
      console.error('Erro ao atribuir função:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveRole = async (roleId: string, schoolId: string) => {
    if (!window.confirm('Tem certeza que deseja remover esta função?')) return;

    setLoading(true);
    try {
      await removeUserFromSchool(selectedUser.id, schoolId);
      await fetchUsers();
    } catch (error) {
      console.error('Erro ao remover função:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'director': return 'bg-purple-100 text-purple-800';
      case 'coordinator': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-yellow-100 text-yellow-800';
      case 'editor': return 'bg-indigo-100 text-indigo-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Administrador';
      case 'admin': return 'Administrador';
      case 'director': return 'Diretor';
      case 'coordinator': return 'Coordenador';
      case 'teacher': return 'Professor';
      case 'staff': return 'Funcionário';
      case 'editor': return 'Editor';
      case 'viewer': return 'Visualizador';
      default: return 'Desconhecido';
    }
  };

  const roles = [
    { value: 'super_admin', label: 'Super Administrador' },
    { value: 'admin', label: 'Administrador' },
    { value: 'director', label: 'Diretor' },
    { value: 'coordinator', label: 'Coordenador' },
    { value: 'teacher', label: 'Professor' },
    { value: 'staff', label: 'Funcionário' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Visualizador' }
  ];

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-education-primary flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Gestão de Funções - {selectedUser.name}
            </CardTitle>
            <CardDescription>
              Gerencie as funções e permissões do usuário nas diferentes escolas
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            Voltar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Formulário para adicionar nova função */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adicionar Nova Função</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Escola</label>
                  <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a escola" />
                    </SelectTrigger>
                    <SelectContent>
                      {schools.map((school) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Função</label>
                  <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole['role'])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleAssignRole}
                    disabled={!selectedSchool || !selectedRole || loading}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Função
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de funções atuais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Funções Atuais</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedUser.userRoles && selectedUser.userRoles.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Escola</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Criação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedUser.userRoles.map((userRole) => (
                      <TableRow key={userRole.id}>
                        <TableCell className="font-medium">
                          {userRole.school?.name || 'Escola não encontrada'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(userRole.role)}>
                            {getRoleText(userRole.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            userRole.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {userRole.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(userRole.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveRole(userRole.id, userRole.school_id)}
                            className="text-red-500 hover:text-red-700"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Este usuário ainda não possui funções atribuídas
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleManager;
