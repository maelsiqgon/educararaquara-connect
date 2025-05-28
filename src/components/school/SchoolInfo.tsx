
import React from 'react';
import { School } from '@/types/school';

export interface SchoolInfoProps {
  school: School;
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ school }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-education-primary mb-4">{school.name}</h2>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-gray-700">Tipo:</span>
          <span className="ml-2 text-gray-600">{school.type}</span>
        </div>
        
        {school.director && (
          <div>
            <span className="font-semibold text-gray-700">Diretor(a):</span>
            <span className="ml-2 text-gray-600">{school.director}</span>
          </div>
        )}
        
        {school.address && (
          <div>
            <span className="font-semibold text-gray-700">Endereço:</span>
            <span className="ml-2 text-gray-600">{school.address}</span>
          </div>
        )}
        
        {school.description && (
          <div>
            <span className="font-semibold text-gray-700">Descrição:</span>
            <p className="mt-2 text-gray-600">{school.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolInfo;
