
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { Loader2, Search, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import MediaUploadForm from './media/MediaUploadForm';
import MediaGrid from './media/MediaGrid';

const MediaLibraryManager = () => {
  const { media, loading, fetchMedia, deleteMedia } = useMediaLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const filteredMedia = media.filter(item => 
    item.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.alt_text && item.alt_text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleUploadSuccess = () => {
    fetchMedia();
  };

  const handleDelete = async (mediaId: string) => {
    const success = await deleteMedia(mediaId);
    if (success) {
      toast.success('Arquivo deletado com sucesso!');
    }
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
        <MediaUploadForm onUploadSuccess={handleUploadSuccess} />
        
        <Separator className="my-6" />
        
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
                <MediaGrid media={filteredMedia} onDelete={handleDelete} />
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
