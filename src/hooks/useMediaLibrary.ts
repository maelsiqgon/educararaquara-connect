
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  folder: string;
  alt_text?: string;
  description?: string;
  tags?: string[];
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
      toast.error('Erro ao carregar biblioteca de mídia');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (
    file: File, 
    folder: string = 'uploads', 
    metadata: Partial<MediaFile> = {}
  ): Promise<MediaFile | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      const { data: { user } } = await supabase.auth.getUser();

      const mediaData = {
        filename: fileName,
        original_name: file.name,
        file_path: publicUrl,
        file_size: file.size,
        mime_type: file.type,
        folder,
        uploaded_by: user?.id,
        ...metadata
      };

      const { data, error } = await supabase
        .from('media_library')
        .insert([mediaData])
        .select()
        .single();

      if (error) throw error;

      await fetchMedia();
      toast.success('Arquivo enviado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao enviar arquivo: ' + err.message);
      return null;
    }
  };

  const deleteFile = async (id: string, filePath: string): Promise<boolean> => {
    try {
      // Extract path from URL for storage deletion
      const pathParts = filePath.split('/');
      const storagePath = pathParts.slice(-2).join('/');

      const { error: storageError } = await supabase.storage
        .from('uploads')
        .remove([storagePath]);

      if (storageError) throw storageError;

      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchMedia();
      toast.success('Arquivo removido com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao remover arquivo: ' + err.message);
      return false;
    }
  };

  const deleteMedia = deleteFile; // Alias for backward compatibility

  const updateFileMetadata = async (
    id: string, 
    metadata: Partial<MediaFile>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('media_library')
        .update(metadata)
        .eq('id', id);

      if (error) throw error;

      await fetchMedia();
      toast.success('Metadados atualizados com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao atualizar metadados: ' + err.message);
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
    deleteMedia,
    updateFileMetadata
  };
};
