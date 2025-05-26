
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockSchools } from './mockData';
import { Users, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";

interface SchoolUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  schoolId: number;
  schoolName: string;
  active: boolean;
  lastAccess: string;
}

const SchoolUserManager = () => {
  const [users, setUsers] = useState<SchoolUser[]>(() => {
    const allUsers: SchoolUser[] = [];
    mockSchools.forEach(school => {
      school.users.forEach((user, index) => {
        allUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as 'admin' | 'editor' | 'viewer',
          schoolId: school.id,
          schoolName: school.name,
          active: true,
          lastAccess: `${20 + index}/05/2025`
        });
      });
    });
    return allUsers;
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<SchoolUser | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string>("all");

  const filteredUsers = selectedSchool === "all" 
    ? users 
    : users.filter(user => user.schoolId.toString() === selectedSchool);

  const handleCreateUser = () => {
    setEditingUser({
      id: 0,
      name: "",
      email: "",
      role: 'viewer',
      schoolId: 1,
      schoolName: "",
      active: true,
      lastAccess: new Date().toLocaleDateString('pt-BR')
    });
    setIsCreating(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    const school = mockSchools.find(s => s.id === editingUser.schoolId);
    if (!school) return;

    if (isCreating) {
      const newUser = {
        ...editingUser,
        id: Math.max(...users.map(u => u.id)) + 1,
        schoolName: school.name
      };
      setUsers([...users, newUser]);
      toast.success("Usuário criado com sucesso!");
    } else {
      setUsers(users.map(u => u.id === editingUser.id ? {...editingUser, schoolName: school.name} : u));
      toast.success("Usuário atualizado com sucesso!");
    }

    setEditingUser(null);
    setIsCreating(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success("Usuário removido com sucesso!");
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, active: !u.active } : u
    ));
    toast.success("Status do usuário atualizado!");
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

  if (editingUser) {
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
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Nome Completo</Label>
                <Input
                  id="user-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="user-email">E-mail</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="border-gray-300 focus-visible:ring-education-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-school">Escola</Label>
                <Select 
                  value={editingUser.schoolId.toString()} 
                  onValueChange={(value) => setEditingUser({...editingUser, schoolId: parseInt(value)})}
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
                <Label htmlFor="user-role">Função</Label>
                <Select 
                  value={editingUser.role} 
                  onValueChange={(value) => setEditingUser({...editingUser, role: value as 'admin' | 'editor' | 'viewer'})}
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

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingUser(null);
                  setIsCreating(false);
                }}
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
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Gestão de Usuários das Escolas
        </CardTitle>
        <CardDescription>
          Gerencie usuários com acesso aos painéis administrativos das escolas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 border-b space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="school-filter">Filtrar por escola:</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Todas as escolas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as escolas</SelectItem>
                  {mockSchools.map((school) => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleCreateUser} className="bg-education-primary hover:bg-education-dark">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Escola</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {user.email}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{user.schoolName}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    <Shield className="h-3 w-3 mr-1" />
                    {getRoleText(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.active ? 'Ativo' : 'Inativo'}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{user.lastAccess}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setEditingUser(user)}
                      className="text-education-primary hover:text-education-dark"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {user.active ? 'Desativar' : 'Ativar'}
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
      </CardContent>
    </Card>
  );
};

export default SchoolUserManager;
