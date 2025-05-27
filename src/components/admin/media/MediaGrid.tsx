
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from 'lucide-react';

interface MediaItem {
  id: string;
  original_name: string;
  file_path: string;
  mime_type: string;
  file_size?: number;
  alt_text?: string;
  folder: string;
}

interface MediaGridProps {
  media: MediaItem[];
  onDelete: (mediaId: string) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({ media, onDelete }) => {
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return null; // Will show image preview
    }
    return <FileText className="h-8 w-8 text-gray-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDelete = async (mediaId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este arquivo?')) {
      onDelete(mediaId);
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum arquivo na biblioteca</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {media.map((item) => (
        <div key={item.id} className="border rounded-md overflow-hidden group">
          <div className="aspect-square relative bg-gray-100">
            {item.mime_type.startsWith('image/') ? (
              <img
                src={item.file_path}
                alt={item.alt_text || item.original_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {getFileIcon(item.mime_type)}
              </div>
            )}
            
            {/* Overlay com ações */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-1">
                <Button size="sm" variant="secondary" asChild>
                  <a href={item.file_path} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <div className="flex items-center space-x-1 mb-1">
              {getFileIcon(item.mime_type)}
              <p className="text-sm font-medium truncate flex-1">
                {item.original_name}
              </p>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{formatFileSize(item.file_size || 0)}</span>
              <Badge variant="outline" className="text-xs">
                {item.folder}
              </Badge>
            </div>
            {item.alt_text && (
              <p className="text-xs text-gray-600 mt-1 truncate">{item.alt_text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
