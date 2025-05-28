
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Plus, Trash2, School } from 'lucide-react';
import { useUsers, User, UserRole } from '@/hooks/useUsers';
import { useSchools } from '@/hooks/useSchools';

interface UserRoleManagerProps {
  user: User;
  onRoleUpdate?: () => void;
}

const UserRoleManager: React.FC<UserRoleManagerProps> = ({ user, onRoleUpdate }) => {
  const { assignUserToSchool, removeUserFromSchool } = useUsers();
  const { schools } = useSchools();
  
  const [newRole, setNewRole] = useState({
    school_id: '',
    role: 'teacher' as UserRole['role']
  });

  const roleLabels = {
    super_admin: 'Super Administrador',
    admin: 'Administrador',
    director: 'Diretor',
    coordinator: 'Coordenador',
    teacher: 'Professor',
    staff: 'Funcionário',
    parent: 'Responsável',
    student: 'Aluno'
  };

  const addRole = async () => {
    if (!newRole.school_id) return;

    try {
      await assignUserToSchool(user.id, newRole.school_id, newRole.role);
      setNewRole({ school_id: '', role: 'teacher' });
      onRoleUpdate?.();
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const removeRole = async (schoolId: string) => {
    try {
      await removeUserFromSchool(user.id, schoolId);
      onRoleUpdate?.();
    } catch (error) {
      console.error('Error removing role:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Funções e Permissões
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Adicionar nova função */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Select 
            value={newRole.school_id} 
            onValueChange={(value) => setNewRole(prev => ({ ...prev, school_id: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar escola" />
            </SelectTrigger>
            <SelectContent>
              {schools.map(school => (
                <SelectItem key={school.id} value={school.id}>
                  {school.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={newRole.role} 
            onValueChange={(value) => setNewRole(prev => ({ ...prev, role: value as UserRole['role'] }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={addRole} disabled={!newRole.school_id}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>

        <Separator />

        {/* Lista de funções atuais */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Funções Atuais</h4>
          {user.roles && user.roles.length > 0 ? (
            user.roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    {roleLabels[role.role]}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <School className="h-4 w-4 mr-1" />
                    {role.school?.name || 'Escola não encontrada'}
                  </div>
                  {!role.active && (
                    <Badge variant="destructive">Inativo</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRole(role.school_id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma função atribuída</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleManager;
