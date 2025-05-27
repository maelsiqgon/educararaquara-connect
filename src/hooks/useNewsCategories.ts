
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

export const useNewsCategories = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_categories')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: Omit<NewsCategory, 'id' | 'created_at'>): Promise<NewsCategory | null> => {
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
      return null;
    }
  };

  const updateCategory = async (id: string, updates: Partial<Omit<NewsCategory, 'id' | 'created_at'>>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('news_categories')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast.success('Categoria atualizada com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao atualizar categoria: ' + err.message);
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('news_categories')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchCategories();
      toast.success('Categoria removida com sucesso!');
      return true;
    } catch (err: any) {
      toast.error('Erro ao remover categoria: ' + err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
