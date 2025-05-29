
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Download, Eye, FileText, Image as ImageIcon } from 'lucide-react';
import { MediaFile } from '@/hooks/useMediaLibrary';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MediaGridProps {
  media: MediaFile[];
  onDelete: (id: string) => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({ media, onDelete }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImage = (mimeType: string) => mimeType.startsWith('image/');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item) => (
        <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Preview */}
          <div className="h-40 bg-gray-100 flex items-center justify-center">
            {isImage(item.mime_type) ? (
              <img
                src={item.file_path}
                alt={item.alt_text || item.original_name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <FileText className="h-12 w-12 mb-2" />
                <span className="text-xs">{item.mime_type}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <h4 className="font-medium text-sm truncate mb-1">
              {item.original_name}
            </h4>
            
            <div className="text-xs text-gray-500 mb-2">
              <div>{formatFileSize(item.file_size)}</div>
              <div>{format(new Date(item.created_at), 'dd/MM/yyyy', { locale: ptBR })}</div>
            </div>

            {item.folder && (
              <Badge variant="secondary" className="text-xs mb-2">
                {item.folder}
              </Badge>
            )}

            {item.alt_text && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                {item.alt_text}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(item.file_path, '_blank')}
                  title="Visualizar"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = item.file_path;
                    link.download = item.original_name;
                    link.click();
                  }}
                  title="Download"
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este arquivo?')) {
                    onDelete(item.id);
                  }
                }}
                className="text-red-500 hover:text-red-700"
                title="Excluir"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
