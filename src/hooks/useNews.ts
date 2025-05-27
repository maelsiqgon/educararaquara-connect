
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NewsCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  active: boolean;
  created_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  category_id?: string;
  author_id?: string;
  school_id?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_at?: string;
  published_at?: string;
  views: number;
  featured: boolean;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  category?: NewsCategory;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  school?: {
    id: string;
    name: string;
  };
}

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          category:news_categories(id, name, color, active, created_at),
          author:profiles(id, name, email),
          school:schools(id, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedNews = (data || []).map(item => ({
        ...item,
        category: item.category ? {
          ...item.category,
          description: ''
        } : undefined
      }));
      
      setNews(transformedNews);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('news_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar categorias');
    }
  };

  const createNews = async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at' | 'views' | 'category' | 'author' | 'school'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchNews();
      toast.success('Notícia criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar notícia: ' + err.message);
      throw err;
    }
  };

  const updateNews = async (id: string, newsData: Partial<Omit<News, 'id' | 'created_at' | 'updated_at' | 'category' | 'author' | 'school'>>) => {
    try {
      const { error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchNews();
      toast.success('Notícia atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar notícia: ' + err.message);
      throw err;
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchNews();
      toast.success('Notícia removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover notícia: ' + err.message);
      throw err;
    }
  };

  const getNewsBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          category:news_categories(id, name, color, active, created_at),
          author:profiles(id, name, email),
          school:schools(id, name)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        category: data.category ? {
          ...data.category,
          description: ''
        } : undefined
      };
    } catch (err: any) {
      toast.error('Notícia não encontrada');
      throw err;
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ views: news.find(n => n.id === id)?.views || 0 + 1 })
        .eq('id', id);

      if (error) throw error;
    } catch (err: any) {
      console.error('Error incrementing views:', err);
    }
  };

  const createCategory = async (categoryData: Omit<NewsCategory, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news_categories')
        .insert([categoryData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchCategories();
      toast.success('Categoria criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar categoria: ' + err.message);
      throw err;
    }
  };

  const updateCategory = async (id: string, categoryData: Partial<Omit<NewsCategory, 'id' | 'created_at'>>) => {
    try {
      const { error } = await supabase
        .from('news_categories')
        .update(categoryData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast.success('Categoria atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar categoria: ' + err.message);
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast.success('Categoria removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover categoria: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchNews();
    fetchCategories();
  }, []);

  return {
    news,
    categories,
    loading,
    error,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
    getNewsBySlug,
    incrementViews,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
