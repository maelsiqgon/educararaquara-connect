
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserRoleManager: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Funções</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Sistema de funções simplificado. Use o campo "Função" no formulário de usuário.</p>
      </CardContent>
    </Card>
  );
};

export default UserRoleManager;
