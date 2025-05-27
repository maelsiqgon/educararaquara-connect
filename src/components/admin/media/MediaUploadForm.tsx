
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import FileUploadComponent from "../FileUploadComponent";

interface MediaUploadFormProps {
  onUploadSuccess: () => void;
}

const MediaUploadForm: React.FC<MediaUploadFormProps> = ({ onUploadSuccess }) => {
  const [selectedBucket, setSelectedBucket] = useState('school-images');

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Upload de Nova Mídia</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block text-sm font-medium mb-2">Tipo de Arquivo</Label>
          <select
            value={selectedBucket}
            onChange={(e) => setSelectedBucket(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-education-primary focus:border-education-primary"
          >
            <option value="school-images">Imagens de Escolas</option>
            <option value="news-images">Imagens de Notícias</option>
            <option value="user-avatars">Avatares de Usuários</option>
            <option value="documents">Documentos</option>
          </select>
        </div>
        <div>
          <FileUploadComponent
            bucket={selectedBucket}
            folder="uploads"
            onUploadSuccess={onUploadSuccess}
            accept={selectedBucket === 'documents' ? '.pdf,.doc,.docx' : 'image/*'}
            label="Arquivo"
            description="Selecione um arquivo para upload"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaUploadForm;
