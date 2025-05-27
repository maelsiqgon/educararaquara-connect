
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from '@/hooks/useSchools';

interface SchoolStatsProps {
  school: School;
}

const SchoolStats: React.FC<SchoolStatsProps> = ({ school }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estatísticas</CardTitle>
        <CardDescription>
          Números atuais da escola
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 mb-1">{school.students}</div>
            <div className="text-sm text-gray-600">Alunos</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-600 mb-1">{school.teachers}</div>
            <div className="text-sm text-gray-600">Professores</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 mb-1">{school.classes}</div>
            <div className="text-sm text-gray-600">Turmas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolStats;
