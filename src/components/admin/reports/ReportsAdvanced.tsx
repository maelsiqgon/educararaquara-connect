
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/hooks/useAuth';

const ReportsAdvanced: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Avançados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>Usuário: {user?.email}</p>
          <p>Função: {profile?.role}</p>
          <p className="text-gray-500">Sistema de relatórios em desenvolvimento.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsAdvanced;
