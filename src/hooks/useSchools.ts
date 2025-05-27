
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface School {
  id: string;
  name: string;
  type: 'EMEI' | 'EMEF' | 'CEMEI' | 'Creche';
  director: string | null;
  address: string | null;
  description: string | null;
  students: number;
  teachers: number;
  classes: number;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  contacts?: SchoolContact[];
}

export interface SchoolContact {
  id: string;
  school_id: string;
  type: 'phone' | 'cellphone' | 'whatsapp' | 'email';
  value: string;
  label: string | null;
  primary_contact: boolean;
}

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('schools')
        .select(`
          *,
          contacts:school_contacts(*)
        `)
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setSchools(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar escolas');
    } finally {
      setLoading(false);
    }
  };

  const createSchool = async (schoolData: Partial<School>) => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchSchools();
      toast.success('Escola criada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar escola: ' + err.message);
      throw err;
    }
  };

  const updateSchool = async (id: string, schoolData: Partial<School>) => {
    try {
      const { error } = await supabase
        .from('schools')
        .update(schoolData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchSchools();
      toast.success('Escola atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar escola: ' + err.message);
      throw err;
    }
  };

  const deleteSchool = async (id: string) => {
    try {
      const { error } = await supabase
        .from('schools')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchSchools();
      toast.success('Escola removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover escola: ' + err.message);
      throw err;
    }
  };

  const getSchoolById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select(`
          *,
          contacts:school_contacts(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Erro ao carregar escola: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return {
    schools,
    loading,
    error,
    fetchSchools,
    createSchool,
    updateSchool,
    deleteSchool,
    getSchoolById
  };
};
