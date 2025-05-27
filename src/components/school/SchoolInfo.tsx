
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, User } from 'lucide-react';

interface SchoolInfoProps {
  address?: string;
  director?: string;
  description?: string;
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ address, director, description }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-education-primary mb-4">Informações</h3>
        <div className="space-y-4">
          {director && (
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-education-primary mt-0.5" />
              <div>
                <p className="font-medium">Diretor(a)</p>
                <p className="text-gray-600">{director}</p>
              </div>
            </div>
          )}
          
          {address && (
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-education-primary mt-0.5" />
              <div>
                <p className="font-medium">Endereço</p>
                <p className="text-gray-600">{address}</p>
              </div>
            </div>
          )}
          
          {description && (
            <div>
              <p className="font-medium mb-2">Sobre a Escola</p>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolInfo;
