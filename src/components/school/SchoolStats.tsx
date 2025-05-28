
import React from 'react';
import { Users, GraduationCap, BookOpen } from 'lucide-react';

export interface SchoolStatsProps {
  students: number;
  teachers: number;
  classes: number;
}

const SchoolStats: React.FC<SchoolStatsProps> = ({ students, teachers, classes }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Estatísticas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{students}</div>
          <div className="text-sm text-gray-600">Estudantes</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
            <GraduationCap className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{teachers}</div>
          <div className="text-sm text-gray-600">Professores</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{classes}</div>
          <div className="text-sm text-gray-600">Turmas</div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStats;
