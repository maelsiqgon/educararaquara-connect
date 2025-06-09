import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image_url?: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  scheduled_at?: string;
  views: number;
  featured: boolean;
  author_id?: string;
  category_id?: string;
  school_id?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
  category?: {
    id: string;
    name: string;
    description?: string;
    color: string;
    active: boolean;
    created_at: string;
  };
  school?: {
    id: string;
    name: string;
    type: string;
  };
}

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          news_categories:category_id (
            id,
            name,
            description,
            color,
            active,
            created_at
          ),
          schools:school_id (
            id,
            name,
            type
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Sistema simplificado - não buscar autor por enquanto
      const processedNews: News[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        image_url: item.image_url,
        status: item.status as 'draft' | 'published' | 'scheduled',
        published_at: item.published_at,
        scheduled_at: item.scheduled_at,
        views: item.views || 0,
        featured: item.featured || false,
        author_id: item.author_id,
        category_id: item.category_id,
        school_id: item.school_id,
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        tags: item.tags || [],
        created_at: item.created_at,
        updated_at: item.updated_at,
        author: item.author_id ? {
          id: item.author_id,
          name: 'Sistema',
          email: 'sistema@araraquara.sp.gov.br'
        } : undefined,
        category: item.news_categories ? {
          id: item.news_categories.id,
          name: item.news_categories.name,
          description: item.news_categories.description,
          color: item.news_categories.color,
          active: item.news_categories.active,
          created_at: item.news_categories.created_at
        } : undefined,
        school: item.schools ? {
          id: item.schools.id,
          name: item.schools.name,
          type: item.schools.type
        } : undefined
      }));

      setNews(processedNews);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar notícias');
    } finally {
      setLoading(false);
    }
  };

  const createNews = async (newsData: Omit<News, 'id' | 'created_at' | 'updated_at' | 'author' | 'category' | 'school' | 'views'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select()
        .single();

      if (error) throw error;
      setNews(prevNews => [...prevNews, data]);
      toast.success('Notícia criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar notícia: ' + err.message);
      throw err;
    }
  };

  const updateNews = async (id: string, newsData: Partial<News>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .update(newsData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setNews(prevNews => prevNews.map(newsItem => (newsItem.id === id ? { ...newsItem, ...data } : newsItem)));
      toast.success('Notícia atualizada com sucesso!');
      return data;
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
      setNews(prevNews => prevNews.filter(newsItem => newsItem.id !== id));
      toast.success('Notícia removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover notícia: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return {
    news,
    loading,
    error,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
  };
};
