
import React, { useState } from 'react';
import { toast } from "sonner";
import { mockSchools } from './mockData';
import UserForm from './school-user/UserForm';
import UserList from './school-user/UserList';

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
          lastAccess: `${20 + index}/05/2025`,
          registration: `REG${1000 + user.id}`,
          phone: `(16) 9${8000 + user.id}-${1000 + index}`,
          cpf: `${100 + user.id}.${200 + index}.${300 + user.id}-${10 + index}`,
          address: `Rua Exemplo, ${100 + user.id} - Araraquara`
        });
      });
    });
    return allUsers;
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<SchoolUser | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<string>("all");

  const handleCreateUser = () => {
    setEditingUser({
      id: 0,
      name: "",
      email: "",
      role: 'viewer',
      schoolId: 1,
      schoolName: "",
      active: true,
      lastAccess: new Date().toLocaleDateString('pt-BR'),
      registration: "",
      phone: "",
      cpf: "",
      address: ""
    });
    setIsCreating(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;

    if (!editingUser.name.trim() || !editingUser.email.trim()) {
      toast.error("Nome e e-mail são obrigatórios!");
      return;
    }

    const school = mockSchools.find(s => s.id === editingUser.schoolId);
    if (!school) {
      toast.error("Escola não encontrada!");
      return;
    }

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
    if (window.confirm("Tem certeza que deseja remover este usuário?")) {
      setUsers(users.filter(u => u.id !== id));
      toast.success("Usuário removido com sucesso!");
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, active: !u.active } : u
    ));
    toast.success("Status do usuário atualizado!");
  };

  if (editingUser) {
    return (
      <UserForm
        user={editingUser}
        isCreating={isCreating}
        onSave={handleSaveUser}
        onCancel={() => {
          setEditingUser(null);
          setIsCreating(false);
        }}
        onUserChange={setEditingUser}
      />
    );
  }

  return (
    <UserList
      users={users}
      selectedSchool={selectedSchool}
      onSchoolFilterChange={setSelectedSchool}
      onCreateUser={handleCreateUser}
      onEditUser={setEditingUser}
      onDeleteUser={handleDeleteUser}
      onToggleUserStatus={toggleUserStatus}
    />
  );
};

export default SchoolUserManager;
