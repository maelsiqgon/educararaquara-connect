
import React from 'react';
import { MapPin, User } from 'lucide-react';

export interface SchoolInfoProps {
  school: {
    address?: string;
    director?: string;
    description?: string;
  };
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ school }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-education-primary mb-4">Informações da Escola</h3>
      
      <div className="space-y-4">
        {school.address && (
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-700">Endereço</h4>
              <p className="text-gray-600">{school.address}</p>
            </div>
          </div>
        )}
        
        {school.director && (
          <div className="flex items-start">
            <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-700">Diretor(a)</h4>
              <p className="text-gray-600">{school.director}</p>
            </div>
          </div>
        )}
        
        {school.description && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Sobre a Escola</h4>
            <p className="text-gray-600 leading-relaxed">{school.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolInfo;
