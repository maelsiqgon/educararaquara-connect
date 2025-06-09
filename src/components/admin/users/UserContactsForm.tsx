
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserContactsForm: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contatos do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Sistema de contatos simplificado em desenvolvimento.</p>
      </CardContent>
    </Card>
  );
};

export default UserContactsForm;
