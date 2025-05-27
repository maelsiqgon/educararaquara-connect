
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockSchools } from '../mockData';

interface SchoolUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  schoolId: number;
  schoolName: string;
  active: boolean;
  lastAccess: string;
  registration?: string;
  phone?: string;
  cpf?: string;
  address?: string;
  schools?: { schoolId: number; role: string; active: boolean }[];
}

interface UserFormProps {
  user: SchoolUser;
  isCreating: boolean;
  onSave: () => void;
  onCancel: () => void;
  onUserChange: (user: SchoolUser) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  user,
  isCreating,
  onSave,
  onCancel,
  onUserChange
}) => {
  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">
          {isCreating ? "Criar Novo Usuário" : "Editar Usuário"}
        </CardTitle>
        <CardDescription>
          {isCreating ? "Adicione um novo usuário para gestão escolar" : "Modifique as informações do usuário"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Nome Completo *</Label>
              <Input
                id="user-name"
                value={user.name}
                onChange={(e) => onUserChange({...user, name: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-email">E-mail *</Label>
              <Input
                id="user-email"
                type="email"
                value={user.email}
                onChange={(e) => onUserChange({...user, email: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-registration">Matrícula</Label>
              <Input
                id="user-registration"
                value={user.registration || ""}
                onChange={(e) => onUserChange({...user, registration: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-phone">Telefone</Label>
              <Input
                id="user-phone"
                value={user.phone || ""}
                onChange={(e) => onUserChange({...user, phone: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-cpf">CPF</Label>
              <Input
                id="user-cpf"
                value={user.cpf || ""}
                onChange={(e) => onUserChange({...user, cpf: e.target.value})}
                className="border-gray-300 focus-visible:ring-education-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-address">Endereço</Label>
            <Input
              id="user-address"
              value={user.address || ""}
              onChange={(e) => onUserChange({...user, address: e.target.value})}
              className="border-gray-300 focus-visible:ring-education-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-school">Escola Principal</Label>
              <Select 
                value={user.schoolId.toString()} 
                onValueChange={(value) => onUserChange({...user, schoolId: parseInt(value)})}
              >
                <SelectTrigger className="border-gray-300 focus-visible:ring-education-primary">
                  <SelectValue placeholder="Selecione a escola" />
                </SelectTrigger>
                <SelectContent>
                  {mockSchools.map((school) => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user-role">Função Principal</Label>
              <Select 
                value={user.role} 
                onValueChange={(value) => onUserChange({...user, role: value as 'admin' | 'editor' | 'viewer'})}
              >
                <SelectTrigger className="border-gray-300 focus-visible:ring-education-primary">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="editor">Editor de Conteúdo</SelectItem>
                  <SelectItem value="viewer">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={user.active}
              onCheckedChange={(active) => onUserChange({...user, active})}
            />
            <Label>Usuário ativo</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onSave}
              className="bg-education-primary hover:bg-education-dark"
            >
              {isCreating ? "Criar Usuário" : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
