
import React from 'react';

export interface SchoolInfoProps {
  address: string;
  director: string;
  description: string;
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ address, director, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Informações da Escola</h3>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-700">Endereço:</h4>
          <p className="text-gray-600">{address}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700">Diretor(a):</h4>
          <p className="text-gray-600">{director}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700">Descrição:</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolInfo;
