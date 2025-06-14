
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  image_url?: string;
  category: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  featured: boolean;
  author_id?: string;
  created_at: string;
  updated_at: string;
}

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedPages: Page[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        content: item.content,
        status: (item.status === 'published' ? 'published' : 'draft') as 'draft' | 'published',
        image_url: item.image_url,
        category: item.category,
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        tags: item.tags || [],
        featured: item.featured,
        author_id: item.author_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setPages(processedPages);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar páginas');
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('pages')
        .insert([{
          ...pageData,
          author_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchPages();
      toast.success('Página criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar página: ' + err.message);
      throw err;
    }
  };

  const updatePage = async (id: string, pageData: Partial<Page>) => {
    try {
      const { error } = await supabase
        .from('pages')
        .update(pageData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchPages();
      toast.success('Página atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar página: ' + err.message);
      throw err;
    }
  };

  const deletePage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPages();
      toast.success('Página removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover página: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return {
    pages,
    loading,
    error,
    fetchPages,
    createPage,
    updatePage,
    deletePage
  };
};
