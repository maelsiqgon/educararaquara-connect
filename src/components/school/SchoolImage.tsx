
import React from 'react';

interface SchoolImageProps {
  image_url?: string;
  name: string;
}

const SchoolImage: React.FC<SchoolImageProps> = ({ image_url, name }) => {
  return (
    <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
      {image_url ? (
        <img 
          src={image_url} 
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <span>Imagem não disponível</span>
        </div>
      )}
    </div>
  );
};

export default SchoolImage;
