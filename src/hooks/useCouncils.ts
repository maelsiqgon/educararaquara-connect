
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Council {
  id: string;
  name: string;
  type: 'FUNDEB' | 'CAE' | 'CME' | 'CACS';
  description: string | null;
  regulation_text: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  members?: CouncilMember[];
  documents?: CouncilDocument[];
  financial?: CouncilFinancial[];
  visits?: CouncilVisit[];
}

export interface CouncilMember {
  id: string;
  council_id: string;
  name: string;
  position: string | null;
  email: string | null;
  phone: string | null;
  start_date: string;
  end_date: string | null;
  active: boolean;
  created_at: string;
}

export interface CouncilDocument {
  id: string;
  council_id: string;
  title: string;
  document_type: string | null;
  file_path: string;
  file_size: number | null;
  meeting_date: string | null;
  year: number | null;
  month: number | null;
  description: string | null;
  uploaded_by: string | null;
  created_at: string;
  uploader?: {
    id: string;
    name: string;
  };
}

export interface CouncilFinancial {
  id: string;
  council_id: string;
  year: number;
  month: number;
  revenue: number;
  expenses: number;
  description: string | null;
  document_path: string | null;
  created_by: string | null;
  created_at: string;
}

export interface CouncilVisit {
  id: string;
  council_id: string;
  school_id: string;
  visit_date: string;
  visitor_name: string;
  observations: string | null;
  report_file_path: string | null;
  created_by: string | null;
  created_at: string;
  school?: {
    id: string;
    name: string;
  };
  creator?: {
    id: string;
    name: string;
  };
}

export const useCouncils = () => {
  const [councils, setCouncils] = useState<Council[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCouncils = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('councils')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setCouncils(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error('Erro ao carregar conselhos');
    } finally {
      setLoading(false);
    }
  };

  const getCouncilById = async (id: string) => {
    try {
      // Get council data
      const { data: council, error: councilError } = await supabase
        .from('councils')
        .select('*')
        .eq('id', id)
        .single();

      if (councilError) throw councilError;

      // Get members
      const { data: members, error: membersError } = await supabase
        .from('council_members')
        .select('*')
        .eq('council_id', id)
        .order('start_date', { ascending: false });

      if (membersError) throw membersError;

      // Get documents
      const { data: documents, error: documentsError } = await supabase
        .from('council_documents')
        .select(`
          *,
          uploader:profiles!uploaded_by(id, name)
        `)
        .eq('council_id', id)
        .order('created_at', { ascending: false });

      if (documentsError) throw documentsError;

      // Get financial records
      const { data: financial, error: financialError } = await supabase
        .from('council_financial_records')
        .select('*')
        .eq('council_id', id)
        .order('year', { ascending: false })
        .order('month', { ascending: false });

      if (financialError) throw financialError;

      // Get school visits
      const { data: visits, error: visitsError } = await supabase
        .from('council_school_visits')
        .select(`
          *,
          school:schools(id, name),
          creator:profiles!created_by(id, name)
        `)
        .eq('council_id', id)
        .order('visit_date', { ascending: false });

      if (visitsError) throw visitsError;

      return {
        ...council,
        members: members || [],
        documents: documents || [],
        financial: financial || [],
        visits: visits || []
      };
    } catch (err: any) {
      toast.error('Erro ao carregar conselho: ' + err.message);
      throw err;
    }
  };

  const createCouncil = async (councilData: Omit<Council, 'id' | 'created_at' | 'updated_at' | 'members' | 'documents' | 'financial' | 'visits'>) => {
    try {
      const { data, error } = await supabase
        .from('councils')
        .insert([councilData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchCouncils();
      toast.success('Conselho criado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao criar conselho: ' + err.message);
      throw err;
    }
  };

  const updateCouncil = async (id: string, councilData: Partial<Omit<Council, 'id' | 'created_at' | 'updated_at' | 'members' | 'documents' | 'financial' | 'visits'>>) => {
    try {
      const { error } = await supabase
        .from('councils')
        .update(councilData)
        .eq('id', id);

      if (error) throw error;
      
      await fetchCouncils();
      toast.success('Conselho atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar conselho: ' + err.message);
      throw err;
    }
  };

  const deleteCouncil = async (id: string) => {
    try {
      const { error } = await supabase
        .from('councils')
        .update({ active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchCouncils();
      toast.success('Conselho removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover conselho: ' + err.message);
      throw err;
    }
  };

  // Council members management
  const addMember = async (councilId: string, memberData: Omit<CouncilMember, 'id' | 'council_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('council_members')
        .insert([{
          ...memberData,
          council_id: councilId
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Membro adicionado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao adicionar membro: ' + err.message);
      throw err;
    }
  };

  const updateMember = async (memberId: string, memberData: Partial<Omit<CouncilMember, 'id' | 'council_id' | 'created_at'>>) => {
    try {
      const { error } = await supabase
        .from('council_members')
        .update(memberData)
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Membro atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar membro: ' + err.message);
      throw err;
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('council_members')
        .update({ active: false })
        .eq('id', memberId);

      if (error) throw error;
      
      toast.success('Membro removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover membro: ' + err.message);
      throw err;
    }
  };

  // Council financial records management
  const addFinancialRecord = async (councilId: string, financialData: Omit<CouncilFinancial, 'id' | 'council_id' | 'created_at' | 'created_by'>) => {
    try {
      const { data, error } = await supabase
        .from('council_financial_records')
        .insert([{
          ...financialData,
          council_id: councilId
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Registro financeiro adicionado com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao adicionar registro financeiro: ' + err.message);
      throw err;
    }
  };

  const updateFinancialRecord = async (recordId: string, financialData: Partial<Omit<CouncilFinancial, 'id' | 'council_id' | 'created_at' | 'created_by'>>) => {
    try {
      const { error } = await supabase
        .from('council_financial_records')
        .update(financialData)
        .eq('id', recordId);

      if (error) throw error;
      
      toast.success('Registro financeiro atualizado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar registro financeiro: ' + err.message);
      throw err;
    }
  };

  const removeFinancialRecord = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from('council_financial_records')
        .delete()
        .eq('id', recordId);

      if (error) throw error;
      
      toast.success('Registro financeiro removido com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover registro financeiro: ' + err.message);
      throw err;
    }
  };

  // School visits management
  const addSchoolVisit = async (councilId: string, visitData: Omit<CouncilVisit, 'id' | 'council_id' | 'created_at' | 'created_by' | 'school' | 'creator'>) => {
    try {
      const { data, error } = await supabase
        .from('council_school_visits')
        .insert([{
          ...visitData,
          council_id: councilId
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Visita registrada com sucesso!');
      return data;
    } catch (err: any) {
      toast.error('Erro ao registrar visita: ' + err.message);
      throw err;
    }
  };

  const updateSchoolVisit = async (visitId: string, visitData: Partial<Omit<CouncilVisit, 'id' | 'council_id' | 'created_at' | 'created_by' | 'school' | 'creator'>>) => {
    try {
      const { error } = await supabase
        .from('council_school_visits')
        .update(visitData)
        .eq('id', visitId);

      if (error) throw error;
      
      toast.success('Visita atualizada com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao atualizar visita: ' + err.message);
      throw err;
    }
  };

  const removeSchoolVisit = async (visitId: string) => {
    try {
      const { error } = await supabase
        .from('council_school_visits')
        .delete()
        .eq('id', visitId);

      if (error) throw error;
      
      toast.success('Visita removida com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao remover visita: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCouncils();
  }, []);

  return {
    councils,
    loading,
    error,
    fetchCouncils,
    getCouncilById,
    createCouncil,
    updateCouncil,
    deleteCouncil,
    addMember,
    updateMember,
    removeMember,
    addFinancialRecord,
    updateFinancialRecord,
    removeFinancialRecord,
    addSchoolVisit,
    updateSchoolVisit,
    removeSchoolVisit
  };
};
