
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, BookOpen } from 'lucide-react';

interface SchoolStatsProps {
  students?: number;
  teachers?: number;
  classes?: number;
}

const SchoolStats: React.FC<SchoolStatsProps> = ({ students = 0, teachers = 0, classes = 0 }) => {
  const stats = [
    {
      label: 'Alunos',
      value: students,
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Professores',
      value: teachers,
      icon: UserCheck,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Turmas',
      value: classes,
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-education-primary">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SchoolStats;
