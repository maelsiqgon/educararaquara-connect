
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { mockSchools } from '../mockData';
import { Users, Plus, Edit, Trash2, Shield, School, Lock, Unlock } from "lucide-react";

interface ExtendedUser {
  id: number;
  name: string;
  email: string;
  registration: string;
  cpf: string;
  phone: string;
  address: string;
  active: boolean;
  lastAccess: string;
  schools: {
    schoolId: number;
    schoolName: string;
    role: 'admin' | 'editor' | 'viewer';
    active: boolean;
    permissions: string[];
  }[];
}

const AdvancedUserManager = () => {
  const [users, setUsers] = useState<ExtendedUser[]>([
    {
      id: 1,
      name: "Ana Silva Santos",
      email: "ana.silva@educ.araraquara.sp.gov.br",
      registration: "REG001",
      cpf: "123.456.789-01",
      phone: "(16) 99999-1234",
      address: "Rua das Flores, 123 - Centro",
      active: true,
      lastAccess: "2025-01-20",
      schools: [
        {
          schoolId: 1,
          schoolName: "EMEF Prof. Henrique Scabello",
          role: 'admin',
          active: true,
          permissions: ['read', 'write', 'delete', 'manage_users']
        },
        {
          schoolId: 2,
          schoolName: "EMEI Criança Feliz",
          role: 'editor',
          active: true,
          permissions: ['read', 'write']
        }
      ]
    }
  ]);

  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

  const handleCreateUser = () => {
    setSelectedUser({
      id: 0,
      name: "",
      email: "",
      registration: "",
      cpf: "",
      phone: "",
      address: "",
      active: true,
      lastAccess: new Date().toLocaleDateString('pt-BR'),
      schools: []
    });
    setIsCreating(true);
    setActiveTab("form");
  };

  const handleEditUser = (user: ExtendedUser) => {
    setSelectedUser(user);
    setIsCreating(false);
    setActiveTab("form");
  };

  const handleSaveUser = () => {
    if (!selectedUser) return;

    if (!selectedUser.name.trim() || !selectedUser.email.trim()) {
      toast.error("Nome e e-mail são obrigatórios!");
      return;
    }

    if (isCreating) {
      const newUser = {
        ...selectedUser,
        id: Math.max(...users.map(u => u.id)) + 1
      };
      setUsers([...users, newUser]);
      toast.success("Usuário criado com sucesso!");
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
      toast.success("Usuário atualizado com sucesso!");
    }

    setSelectedUser(null);
    setIsCreating(false);
    setActiveTab("list");
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      setUsers(users.filter(u => u.id !== id));
      toast.success("Usuário removido com sucesso!");
    }
  };

  const addSchoolToUser = () => {
    if (!selectedUser) return;
    
    const newSchool = {
      schoolId: 0,
      schoolName: "",
      role: 'viewer' as const,
      active: true,
      permissions: ['read']
    };

    setSelectedUser({
      ...selectedUser,
      schools: [...selectedUser.schools, newSchool]
    });
  };

  const removeSchoolFromUser = (index: number) => {
    if (!selectedUser) return;
    
    setSelectedUser({
      ...selectedUser,
      schools: selectedUser.schools.filter((_, i) => i !== index)
    });
  };

  const updateUserSchool = (index: number, field: string, value: any) => {
    if (!selectedUser) return;

    const updatedSchools = [...selectedUser.schools];
    updatedSchools[index] = { ...updatedSchools[index], [field]: value };

    if (field === 'schoolId') {
      const school = mockSchools.find(s => s.id === parseInt(value));
      if (school) {
        updatedSchools[index].schoolName = school.name;
      }
    }

    if (field === 'role') {
      // Define permissões baseadas na função
      const rolePermissions = {
        admin: ['read', 'write', 'delete', 'manage_users'],
        editor: ['read', 'write'],
        viewer: ['read']
      };
      updatedSchools[index].permissions = rolePermissions[value] || ['read'];
    }

    setSelectedUser({
      ...selectedUser,
      schools: updatedSchools
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'editor': return 'Editor';
      case 'viewer': return 'Visualizador';
      default: return 'Desconhecido';
    }
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Gestão Avançada de Usuários
        </CardTitle>
        <CardDescription>
          Sistema completo de gestão de usuários com múltiplas escolas e permissões granulares
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Lista de Usuários</TabsTrigger>
            <TabsTrigger value="form">Formulário</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Usuários Cadastrados</h3>
              <Button onClick={handleCreateUser} className="bg-education-primary hover:bg-education-dark">
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Escolas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.registration}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.schools.slice(0, 2).map((school, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {school.schoolName}
                          </Badge>
                        ))}
                        {user.schools.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.schools.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-education-primary hover:text-education-dark"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            {selectedUser && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    {isCreating ? "Criar Novo Usuário" : "Editar Usuário"}
                  </h3>
                  <Button variant="outline" onClick={() => setActiveTab("list")}>
                    Voltar
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Nome Completo *</Label>
                    <Input
                      id="user-name"
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-email">E-mail *</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-registration">Matrícula</Label>
                    <Input
                      id="user-registration"
                      value={selectedUser.registration}
                      onChange={(e) => setSelectedUser({...selectedUser, registration: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-cpf">CPF</Label>
                    <Input
                      id="user-cpf"
                      value={selectedUser.cpf}
                      onChange={(e) => setSelectedUser({...selectedUser, cpf: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-phone">Telefone</Label>
                    <Input
                      id="user-phone"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                      className="border-gray-300 focus-visible:ring-education-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-address">Endereço</Label>
                  <Input
                    id="user-address"
                    value={selectedUser.address}
                    onChange={(e) => setSelectedUser({...selectedUser, address: e.target.value})}
                    className="border-gray-300 focus-visible:ring-education-primary"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-medium">Escolas e Permissões</Label>
                    <Button variant="outline" onClick={addSchoolToUser}>
                      <School className="h-4 w-4 mr-2" />
                      Adicionar Escola
                    </Button>
                  </div>

                  {selectedUser.schools.map((school, index) => (
                    <Card key={index} className="border">
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                          <div className="space-y-2">
                            <Label>Escola</Label>
                            <Select 
                              value={school.schoolId.toString()} 
                              onValueChange={(value) => updateUserSchool(index, 'schoolId', parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a escola" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockSchools.map((s) => (
                                  <SelectItem key={s.id} value={s.id.toString()}>
                                    {s.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Função</Label>
                            <Select 
                              value={school.role} 
                              onValueChange={(value) => updateUserSchool(index, 'role', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Visualizador</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={school.active}
                              onCheckedChange={(checked) => updateUserSchool(index, 'active', checked)}
                            />
                            <Label>Ativo</Label>
                          </div>

                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => removeSchoolFromUser(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-4">
                          <Label className="text-sm font-medium">Permissões:</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {school.permissions.map((permission, permIndex) => (
                              <Badge key={permIndex} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={selectedUser.active}
                    onCheckedChange={(active) => setSelectedUser({...selectedUser, active})}
                  />
                  <Label>Usuário ativo</Label>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab("list")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveUser}
                    className="bg-education-primary hover:bg-education-dark"
                  >
                    {isCreating ? "Criar Usuário" : "Salvar Alterações"}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Níveis de Permissão</CardTitle>
                <CardDescription>
                  Entenda os diferentes níveis de acesso do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-red-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        <h4 className="font-semibold text-red-800">Administrador</h4>
                      </div>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Acesso total ao sistema</li>
                        <li>• Gerenciar usuários</li>
                        <li>• Criar e deletar conteúdo</li>
                        <li>• Configurações da escola</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Edit className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Editor</h4>
                      </div>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Criar e editar conteúdo</li>
                        <li>• Gerenciar notícias</li>
                        <li>• Upload de mídias</li>
                        <li>• Não pode deletar</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200">
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-5 w-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-800">Visualizador</h4>
                      </div>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Apenas visualização</li>
                        <li>• Acesso a relatórios</li>
                        <li>• Não pode editar</li>
                        <li>• Consulta de dados</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedUserManager;
