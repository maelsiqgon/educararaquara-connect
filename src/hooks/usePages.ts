
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'published' | 'draft';
  featured: boolean;
  image_url?: string;
  category: string;
  author_id?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
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
      // Por enquanto, usar dados mock até criarmos a tabela pages
      const mockPages: Page[] = [
        {
          id: '1',
          title: 'Página inicial',
          slug: 'home',
          content: 'Conteúdo da página inicial',
          status: 'published',
          featured: true,
          category: 'Geral',
          author_id: '',
          meta_title: 'Home',
          meta_description: 'Página inicial do portal',
          tags: ['home', 'principal'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setPages(mockPages);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar páginas');
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (pageData: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // Mock implementation - aguardando criação da tabela
      const newPage: Page = {
        ...pageData,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setPages(prev => [newPage, ...prev]);
      toast.success('Página criada com sucesso!');
      return newPage;
    } catch (err: any) {
      toast.error('Erro ao criar página: ' + err.message);
      throw err;
    }
  };

  const updatePage = async (id: string, pageData: Partial<Page>) => {
    try {
      // Mock implementation - aguardando criação da tabela
      setPages(prev => prev.map(page => 
        page.id === id 
          ? { ...page, ...pageData, updated_at: new Date().toISOString() }
          : page
      ));
      toast.success('Página atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar página: ' + err.message);
      throw err;
    }
  };

  const deletePage = async (id: string) => {
    try {
      // Mock implementation - aguardando criação da tabela
      setPages(prev => prev.filter(page => page.id !== id));
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
