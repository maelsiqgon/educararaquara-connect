
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import FileUploadComponent from '@/components/admin/FileUploadComponent';
import { useUsers, User } from '@/hooks/useUsers';
import { useSchools } from '@/hooks/useSchools';
import { toast } from 'sonner';
import { Plus, Trash2, UserCheck, UserX } from 'lucide-react';

interface UserFormProps {
  user?: User;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel }) => {
  const { createUser, updateUser, assignUserToSchool, removeUserFromSchool } = useUsers();
  const { schools } = useSchools();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    registration: '',
    avatar_url: '',
    active: true
  });

  const [newRole, setNewRole] = useState({
    school_id: '',
    role: 'teacher' as const
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        cpf: user.cpf || '',
        phone: user.phone || '',
        address: user.address || '',
        registration: user.registration || '',
        avatar_url: user.avatar_url || '',
        active: user.active
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (result: { url: string; path: string }) => {
    setFormData(prev => ({
      ...prev,
      avatar_url: result.url
    }));
  };

  const addRole = async () => {
    if (!newRole.school_id || !user?.id) {
      toast.error('Selecione uma escola e role');
      return;
    }

    const success = await assignUserToSchool(user.id, newRole.school_id, newRole.role);
    if (success) {
      setNewRole({
        school_id: '',
        role: 'teacher'
      });
    }
  };

  const removeRole = async (schoolId: string) => {
    if (!user?.id) return;
    await removeUserFromSchool(user.id, schoolId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (user?.id) {
        // Atualizar usuário existente
        await updateUser(user.id, formData);
      } else {
        // Criar novo usuário
        await createUser(formData);
      }
      
      toast.success(user ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
      onSuccess?.();
    } catch (error) {
      toast.error('Erro ao salvar usuário');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRoleLabel = (role: string) => {
    const labels = {
      super_admin: 'Super Administrador',
      admin: 'Administrador',
      director: 'Diretor',
      coordinator: 'Coordenador',
      teacher: 'Professor',
      staff: 'Funcionário',
      parent: 'Responsável',
      student: 'Aluno'
    };
    return labels[role as keyof typeof labels] || role;
  };

  const getSchoolName = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || 'Escola não encontrada';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(16) 99999-9999"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Endereço completo"
            />
          </div>

          <div>
            <Label htmlFor="registration">Matrícula/Registro</Label>
            <Input
              id="registration"
              value={formData.registration}
              onChange={(e) => handleInputChange('registration', e.target.value)}
              placeholder="Número de matrícula ou registro"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleInputChange('active', checked)}
            />
            <Label htmlFor="active">Usuário ativo</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Foto do Usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploadComponent
            bucket="user-avatars"
            folder={user?.id || 'temp'}
            onUploadSuccess={handleAvatarUpload}
            accept="image/*"
            label="Avatar"
            description="Adicione uma foto do usuário"
            initialPreview={formData.avatar_url}
          />
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Funções e Escolas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Lista de funções existentes */}
            {user.roles && user.roles.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Funções Atuais</h4>
                {user.roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{getRoleLabel(role.role)}</Badge>
                          {role.school && (
                            <span className="text-sm text-gray-600">
                              na {role.school.name}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Ativo: {role.active ? 'Sim' : 'Não'}
                        </div>
                      </div>
                    </div>
                    {role.school_id && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRole(role.school_id!)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Separator />

            {/* Adicionar nova função */}
            <div className="space-y-3">
              <h4 className="font-medium">Adicionar Função</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select
                  value={newRole.school_id}
                  onValueChange={(value) => setNewRole(prev => ({ ...prev, school_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma escola" />
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
                  onValueChange={(value: any) => setNewRole(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Administrador</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="director">Diretor</SelectItem>
                    <SelectItem value="coordinator">Coordenador</SelectItem>
                    <SelectItem value="teacher">Professor</SelectItem>
                    <SelectItem value="staff">Funcionário</SelectItem>
                    <SelectItem value="parent">Responsável</SelectItem>
                    <SelectItem value="student">Aluno</SelectItem>
                  </SelectContent>
                </Select>

                <Button type="button" onClick={addRole} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : user ? 'Atualizar' : 'Criar'} Usuário
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
