
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School } from '@/hooks/useSchools';

interface SchoolInfoProps {
  school: School;
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({ school }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre a Escola</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">{school.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-education-primary">
              {school.type}
            </Badge>
            {!school.active && (
              <Badge variant="destructive">
                Inativa
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolInfo;
