
import React from 'react';
import { School } from '@/types/school';

export interface SchoolStatsProps {
  school: School;
}

const SchoolStats: React.FC<SchoolStatsProps> = ({ school }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Estatísticas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{school.students}</div>
          <div className="text-sm text-gray-600">Alunos</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{school.teachers}</div>
          <div className="text-sm text-gray-600">Professores</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">{school.classes}</div>
          <div className="text-sm text-gray-600">Salas</div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStats;
