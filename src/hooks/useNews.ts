
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  category_id: string | null;
  author_id: string | null;
  school_id: string | null;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_at: string | null;
  published_at: string | null;
  views: number;
  featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  category?: NewsCategory;
  author?: Profile;
  school?: School;
}

export interface NewsCategory {
  id: string;
  name: string;
  description: string | null;
  color: string;
  active: boolean;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
}

export interface School {
  id: string;
  name: string;
}

export const useNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (status?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('news')
        .select(`
          *,
          category:news_categories(*),
          author:profiles(id, name, email),
          school:schools(id, name)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      setNews(data || []);
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
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      toast.error('Erro ao carregar categorias');
    }
  };

  const createNews = async (newsData: Partial<NewsArticle>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([{
          ...newsData,
          slug: newsData.title?.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || '',
        }])
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

  const updateNews = async (id: string, newsData: Partial<NewsArticle>) => {
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

  const publishNews = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchNews();
      toast.success('Notícia publicada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao publicar notícia: ' + err.message);
      throw err;
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const { error } = await supabase.rpc('increment_news_views', { news_id: id });
      if (error) console.error('Error incrementing views:', error);
    } catch (err) {
      console.error('Error incrementing views:', err);
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
    fetchCategories,
    createNews,
    updateNews,
    deleteNews,
    publishNews,
    incrementViews
  };
};
