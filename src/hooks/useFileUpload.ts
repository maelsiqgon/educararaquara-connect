
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (
    file: File,
    bucket: string,
    folder?: string
  ): Promise<UploadResult | null> => {
    try {
      setIsUploading(true);
      
      // Validar tipo de arquivo
      const allowedTypes = {
        'school-images': ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        'news-images': ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        'user-avatars': ['image/jpeg', 'image/png', 'image/webp'],
        'documents': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      };

      if (!allowedTypes[bucket as keyof typeof allowedTypes]?.includes(file.type)) {
        toast.error('Tipo de arquivo não permitido');
        return null;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Arquivo deve ter menos de 5MB');
        return null;
      }

      // Gerar nome único
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload para Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        toast.error('Erro ao fazer upload do arquivo');
        return null;
      }

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      toast.success('Arquivo enviado com sucesso!');
      
      return {
        url: publicUrl,
        path: filePath
      };

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Erro ao fazer upload do arquivo');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (bucket: string, path: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) {
        console.error('Delete error:', error);
        toast.error('Erro ao deletar arquivo');
        return false;
      }

      toast.success('Arquivo deletado com sucesso!');
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Erro ao deletar arquivo');
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading
  };
};
