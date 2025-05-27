
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School } from '@/hooks/useSchools';

interface SchoolImageProps {
  school: School;
}

const SchoolImage: React.FC<SchoolImageProps> = ({ school }) => {
  if (!school.image_url) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagem da Escola</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={school.image_url}
          alt={school.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

export default SchoolImage;
