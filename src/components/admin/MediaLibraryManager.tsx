
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FileUploadComponent from "./FileUploadComponent";
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { Loader2, Search, Edit, Trash2, Image as ImageIcon, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

const MediaLibraryManager = () => {
  const { media, loading, fetchMedia, deleteMedia } = useMediaLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('school-images');
  
  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const filteredMedia = media.filter(item => 
    item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.alt_text && item.alt_text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUploadSuccess = () => {
    fetchMedia(); // Recarregar a lista após upload
  };

  const handleDelete = async (mediaId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este arquivo?')) {
      const success = await deleteMedia(mediaId);
      if (success) {
        toast.success('Arquivo deletado com sucesso!');
      }
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader className="bg-education-light rounded-t-lg">
        <CardTitle className="text-education-primary">Biblioteca de Mídias</CardTitle>
        <CardDescription>
          Gerencie todas as imagens e arquivos do portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Upload de Nova Mídia */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Upload de Nova Mídia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Arquivo</label>
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
                onUploadSuccess={handleUploadSuccess}
                accept={selectedBucket === 'documents' ? '.pdf,.doc,.docx' : 'image/*'}
                label="Arquivo"
                description="Selecione um arquivo para upload"
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Lista de Mídias */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Mídias Existentes</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar mídia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              {filteredMedia.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    {searchTerm ? 'Nenhum arquivo encontrado' : 'Nenhum arquivo na biblioteca'}
                  </h4>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? 'Tente ajustar os termos de busca.' 
                      : 'Faça upload do primeiro arquivo usando o formulário acima.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredMedia.map((item) => (
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
                            <FileText className="h-8 w-8 text-gray-400" />
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
              )}
            </>
          )}
        </div>
      </CardContent>
      
      {filteredMedia.length > 0 && (
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Exibindo {filteredMedia.length} de {media.length} itens
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default MediaLibraryManager;
