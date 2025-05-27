
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Edit, Trash2, Mail, Shield } from "lucide-react";
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

interface UserListProps {
  users: SchoolUser[];
  selectedSchool: string;
  onSchoolFilterChange: (school: string) => void;
  onCreateUser: () => void;
  onEditUser: (user: SchoolUser) => void;
  onDeleteUser: (id: number) => void;
  onToggleUserStatus: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  selectedSchool,
  onSchoolFilterChange,
  onCreateUser,
  onEditUser,
  onDeleteUser,
  onToggleUserStatus
}) => {
  const filteredUsers = selectedSchool === "all" 
    ? users 
    : users.filter(user => user.schoolId.toString() === selectedSchool);

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
              <Select value={selectedSchool} onValueChange={onSchoolFilterChange}>
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
            
            <Button onClick={onCreateUser} className="bg-education-primary hover:bg-education-dark">
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
                      onClick={() => onEditUser(user)}
                      className="text-education-primary hover:text-education-dark"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onToggleUserStatus(user.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {user.active ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDeleteUser(user.id)}
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

export default UserList;
