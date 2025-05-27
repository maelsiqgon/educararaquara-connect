
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  alt_text?: string;
  description?: string;
  tags?: string[];
  folder?: string;
  uploaded_by?: string;
  school_id?: string;
  created_at: string;
}

export const useMediaLibrary = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchMedia = async (folder?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (folder) {
        query = query.eq('folder', folder);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMedia(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar mídia: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (
    file: File,
    folder: string = 'uploads',
    metadata?: Partial<MediaFile>
  ): Promise<MediaFile | null> => {
    try {
      // Validar tipo de arquivo
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Tipo de arquivo não permitido');
        return null;
      }

      // Validar tamanho (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo deve ter menos de 10MB');
        return null;
      }

      // Gerar nome único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload para Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Erro ao fazer upload do arquivo');
        return null;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      // Salvar metadados na base de dados
      const { data: mediaData, error: dbError } = await supabase
        .from('media_library')
        .insert([{
          filename: fileName,
          original_name: file.name,
          file_path: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          folder,
          alt_text: metadata?.alt_text || '',
          description: metadata?.description || '',
          tags: metadata?.tags || [],
          school_id: metadata?.school_id
        }])
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        toast.error('Erro ao salvar metadados do arquivo');
        return null;
      }

      await fetchMedia();
      toast.success('Arquivo enviado com sucesso!');
      return mediaData;

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao fazer upload do arquivo');
      return null;
    }
  };

  const deleteFile = async (id: string, filePath: string): Promise<boolean> => {
    try {
      // Remover do storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath.split('/').slice(-2).join('/')]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }

      // Remover da base de dados
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (dbError) {
        console.error('Database delete error:', dbError);
        toast.error('Erro ao deletar arquivo');
        return false;
      }

      await fetchMedia();
      toast.success('Arquivo deletado com sucesso!');
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Erro ao deletar arquivo');
      return false;
    }
  };

  const updateFileMetadata = async (id: string, metadata: Partial<MediaFile>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('media_library')
        .update(metadata)
        .eq('id', id);

      if (error) {
        console.error('Update error:', error);
        toast.error('Erro ao atualizar metadados');
        return false;
      }

      await fetchMedia();
      toast.success('Metadados atualizados com sucesso!');
      return true;
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Erro ao atualizar metadados');
      return false;
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return {
    media,
    loading,
    error,
    fetchMedia,
    uploadFile,
    deleteFile,
    updateFileMetadata
  };
};
