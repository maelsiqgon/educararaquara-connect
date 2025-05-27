
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  alt_text: string | null;
  description: string | null;
  tags: string[] | null;
  folder: string;
  uploaded_by: string | null;
  school_id: string | null;
  created_at: string;
}

export const useMediaLibrary = () => {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      toast.error('Erro ao carregar arquivos');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file: File, folder = 'uploads', metadata?: Partial<MediaFile>) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);

      // Save to media library
      const { data, error } = await supabase
        .from('media_library')
        .insert([{
          filename: fileName,
          original_name: file.name,
          file_path: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          folder,
          ...metadata
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchMedia();
      toast.success('Arquivo enviado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao enviar arquivo: ' + err.message);
      throw err;
    }
  };

  const deleteFile = async (id: string, filePath: string) => {
    try {
      // Delete from storage
      const path = filePath.split('/').slice(-2).join('/'); // Get relative path
      await supabase.storage
        .from('uploads')
        .remove([path]);

      // Delete from database
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchMedia();
      toast.success('Arquivo removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover arquivo: ' + err.message);
      throw err;
    }
  };

  const updateFileMetadata = async (id: string, metadata: Partial<MediaFile>) => {
    try {
      const { error } = await supabase
        .from('media_library')
        .update(metadata)
        .eq('id', id);

      if (error) throw error;

      await fetchMedia();
      toast.success('Metadados atualizados com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar metadados: ' + err.message);
      throw err;
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
