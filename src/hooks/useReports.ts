
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ReportData {
  id: string;
  title: string;
  type: string;
  data: any;
  created_at: string;
}

export const useReports = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      
      // Sistema simplificado - buscar dados básicos
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      // Gerar relatórios simples
      const generatedReports: ReportData[] = [
        {
          id: '1',
          title: 'Usuários Ativos',
          type: 'users',
          data: {
            total: profilesData?.length || 0,
            active: profilesData?.filter(p => p.active).length || 0
          },
          created_at: new Date().toISOString()
        }
      ];

      setReports(generatedReports);
    } catch (err: any) {
      setError(err.message);
      console.error('Erro ao gerar relatórios:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string, params?: any) => {
    try {
      await fetchReports();
      toast.success('Relatório gerado com sucesso!');
    } catch (err: any) {
      toast.error('Erro ao gerar relatório: ' + err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    loading,
    error,
    fetchReports,
    generateReport
  };
};
