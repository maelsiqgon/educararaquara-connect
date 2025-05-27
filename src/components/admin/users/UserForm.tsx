
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
import { useUsers, User, UserRole } from '@/hooks/useUsers';
import { useSchools } from '@/hooks/useSchools';
import { toast } from 'sonner';
import { Save, Plus, Trash2 } from 'lucide-react';

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
    active: true
  });

  const [newRole, setNewRole] = useState({
    school_id: '',
    role: 'teacher' as UserRole['role']
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

  const addRole = async () => {
    if (!newRole.school_id || !user?.id) return;

    try {
      await assignUserToSchool(user.id, newRole.school_id, newRole.role);
      setNewRole({
        school_id: '',
        role: 'teacher'
      });
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  const removeRole = async (userId: string, schoolId: string) => {
    try {
      await removeUserFromSchool(userId, schoolId);
    } catch (error) {
      console.error('Error removing role:', error);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Nome e e-mail são obrigatórios');
      return;
    }

    setIsSubmitting(true);

    try {
      if (user?.id) {
        await updateUser(user.id, formData);
      } else {
        await createUser(formData);
      }
      
      toast.success(
        user?.id 
          ? 'Usuário atualizado com sucesso!' 
          : 'Usuário criado com sucesso!'
      );
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {user?.id ? 'Editar' : 'Criar'} Usuário
        </h2>
      </div>

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
              <Label htmlFor="email">E-mail *</Label>
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

      {user?.id && (
        <Card>
          <CardHeader>
            <CardTitle>Funções e Permissões</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Select value={newRole.school_id} onValueChange={(value) => setNewRole(prev => ({ ...prev, school_id: value }))}>
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

              <Select value={newRole.role} onValueChange={(value) => setNewRole(prev => ({ ...prev, role: value as UserRole['role'] }))}>
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

              <Button onClick={addRole} disabled={!newRole.school_id}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Função
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              {user?.roles?.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">
                      {getRoleLabel(role.role)}
                    </Badge>
                    <span className="font-medium">{role.school?.name}</span>
                    {!role.active && (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRole(user.id, role.school_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
        
        <Button
          type="button"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2" />
          {user?.id ? 'Atualizar' : 'Criar'} Usuário
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
